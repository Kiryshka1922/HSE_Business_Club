import { type PeopleDto } from "@/shared/schemas/schemas";
import styles from "./PeopleCard.module.css";
import { GradientBox } from "@/shared/ui/GradientBox/GradientBox";
import HeartIcon from "@assets/icons/like.svg";
import UnlikeIcon from "@assets/icons/unlike.svg";
import TgIcon from "@assets/icons/tg-logo.svg";
import InterestIcon from "@assets/icons/interest.svg";
import DateIcon from "@assets/icons/date.svg";
import CrossIcon from "@assets/icons/cross.svg";
import { useDatingtStore } from "../../lib/useDatingStore";
import { useEffect, useRef, useState } from "react";

interface Coords {
  x?: number;
  y?: number;
}

export const PeopleCard = ({
  peopleData,
  setActiveIndex,
}: {
  peopleData: PeopleDto[number];
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const { togglePeopleLike } = useDatingtStore();
  const [translateCoords, setTranslateCoords] = useState<Coords>({});
  const initialCoords = useRef<Coords>({});
  const [likeStatus, setLikeStatus] = useState<"like" | "unlike" | "empty">(
    "empty",
  );
  const [isDisappear, setIsDisappear] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showLikeIcon, setShowLikeIcon] = useState(false);
  const [showUnlikeIcon, setShowUnlikeIcon] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Сброс всех состояний при смене карточки
  useEffect(() => {
    setTranslateCoords({ x: 0, y: 0 });
    setLikeStatus("empty");
    setIsDisappear(false);
    setIsAnimating(false);
    setShowLikeIcon(false);
    setShowUnlikeIcon(false);
    if (cardRef.current) {
      cardRef.current.style.setProperty("--swipe-direction", "0px");
    }
  }, [peopleData._id]);

  useEffect(() => {
    if (likeStatus === "like") {
      setShowLikeIcon(true);
      setShowUnlikeIcon(false);
      // Иконка показывается дольше, чтобы увидеть анимацию
      const timer = setTimeout(() => setShowLikeIcon(false), 2000);
      return () => clearTimeout(timer);
    } else if (likeStatus === "unlike") {
      setShowUnlikeIcon(true);
      setShowLikeIcon(false);
      const timer = setTimeout(() => setShowUnlikeIcon(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [likeStatus]);

  const performSwipe = (direction: "like" | "unlike") => {
    if (isAnimating || isDisappear) return;
    togglePeopleLike(peopleData._id);

    setIsAnimating(true);
    const deltaX = direction === "like" ? 100 : -100;

    setTranslateCoords({ x: deltaX, y: 0 });

    setLikeStatus(direction);

    if (cardRef.current) {
      cardRef.current.style.setProperty("--swipe-direction", `${deltaX}px`);
    }

    setTimeout(() => {
      setIsDisappear(true);
    }, 1800);
    setTimeout(() => {
      setActiveIndex((prev) => prev + 1);
      setIsAnimating(false);
    }, 2000);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isAnimating || isDisappear) return;
    const touch = e.touches[0];
    initialCoords.current = {
      x: touch.clientX,
      y: touch.clientY,
    };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isAnimating || isDisappear) return;

    const touch = e.touches[0];
    const dx = touch.clientX - (initialCoords.current.x || 0);
    const dy = touch.clientY - (initialCoords.current.y || 0);

    setTranslateCoords({
      x: dx >= 0 ? Math.min(dx, 50) : Math.max(-50, dx),
      y: dy >= 0 ? Math.min(dy, 7) : Math.max(-7, dy),
    });

    if (dx > 35) {
      setLikeStatus("like");
    } else if (dx < -35) {
      setLikeStatus("unlike");
    } else if (Math.abs(dx) <= 35) {
      setLikeStatus("empty");
    }
  };

  const handleTouchEnd = () => {
    if (isAnimating || isDisappear) return;

    if (likeStatus === "like" || likeStatus === "unlike") {
      performSwipe(likeStatus);
    } else {
      setTranslateCoords({ x: 0, y: 0 });
    }
  };

  return (
    <>
      <div
        aria-label={`${peopleData.first_name} ${peopleData.last_name} ${peopleData.description}`}
        ref={cardRef}
        className={`
          ${styles.PeopleCard}
          ${likeStatus === "like" ? styles.PeopleCard_selectLike : ""}
          ${likeStatus === "unlike" ? styles.PeopleCard_selectUnlike : ""}
          ${isDisappear ? styles.PeopleCard_disappear : ""}
        `}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          transform: `translate(${translateCoords.x}px, ${translateCoords.y}px)`,
        }}
      >
        <img
          src={peopleData.photo_url}
          alt={`${peopleData.first_name} ${peopleData.last_name} photo`}
        />

        <div className={styles.PeopleCard__personalData}>
          <div className={styles.PeopleCard__generall}>
            <div>{`${peopleData.first_name} ${peopleData.last_name}`}</div>
            <div>{peopleData.age}</div>
          </div>
          <div className={styles.PeopleCard__interests}>
            {peopleData.interests.map((interest, idx) => (
              <GradientBox
                key={idx}
                gradient={
                  "linear-gradient(90deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0))"
                }
                backgroundColor="#06081C"
              >
                <div className={styles.PeopleCard__interest}>{interest}</div>
              </GradientBox>
            ))}
          </div>
        </div>

        <div className={styles.PeopleCard__desc}>{peopleData.description}</div>

        <div className={styles.PeopleCard__details}>
          <div className={styles.PeopleCard__contacts}>
            <TgIcon />
            <span>{peopleData.tg_username}</span>
          </div>
          <div className={styles.PeopleCard__activity}>
            <InterestIcon />
            <span>{peopleData.type_activity}</span>
          </div>
        </div>

        <HeartIcon
          className={`${styles.PeopleCard__likeIcon} ${
            peopleData.isLiked ? styles.PeopleCard__likeIcon_liked : ""
          }`}
        />

        {showLikeIcon && (
          <HeartIcon className={styles.PeopleCard__HeartSelectLikeIcon} />
        )}
        {showUnlikeIcon && (
          <UnlikeIcon className={styles.PeopleCard__HeartSelectUnlikeIcon} />
        )}
      </div>

      <div className={styles.PeopleCard__buttons}>
        <button
          className={`${styles.PeopleCard__button} ${styles.PeopleCard__button_cross}`}
          onClick={() => performSwipe("unlike")}
          disabled={isAnimating || isDisappear}
        >
          <CrossIcon />
        </button>
        <button
          className={`${styles.PeopleCard__button} ${styles.PeopleCard__button_date}`}
          onClick={() => performSwipe("like")}
          disabled={isAnimating || isDisappear}
        >
          <DateIcon />
        </button>
      </div>
    </>
  );
};
