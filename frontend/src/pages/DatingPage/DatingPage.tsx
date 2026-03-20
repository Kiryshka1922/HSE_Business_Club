import DateIcon from "@assets/icons/date.svg";
import CrossIcon from "@assets/icons/cross.svg";
import styles from "./DatingPage.module.css";
import { apiClient } from "@/shared/api/apiClient";
import { type PeopleDto, peopleDtoSchema } from "@/shared/schemas/schemas";
import { useDatingtStore } from "./lib/useDatingStore";
import { useLayoutEffect, useState } from "react";
import { PeopleCard } from "./ui/PeopleCard/PeopleCard";

export async function loader() {
  const data = await apiClient.get<PeopleDto>("/peoples", {}, peopleDtoSchema);
  return data;
}

export default function DatingPage({ loaderData }: { loaderData: PeopleDto }) {
  const { setPeoples } = useDatingtStore();
  const [activeIndex, setActiveIndex] = useState(0);

  // Инициализируем стор данными
  useLayoutEffect(() => {
    if (loaderData.length > 0) {
      console.log(loaderData);
      setPeoples(loaderData);
    }
  }, [loaderData, setPeoples]);
  return (
    <div className={styles.datePage}>
      <div className={styles.datePage__title}>
        <h1>Дейтинг</h1>
        <div className={styles.datePage__title__icon}>
          <DateIcon />
        </div>
      </div>

      {
        <div className={styles.datePage__cardContainer}>
          <PeopleCard
            setActiveIndex={setActiveIndex}
            peopleData={loaderData[activeIndex % loaderData.length]}
          />
        </div>
      }

      <div className={styles.diamond}></div>
      <div className={styles.diamond + " " + styles.diamond_2}></div>
      <div className={styles.diamond + " " + styles.diamond_3}></div>
    </div>
  );
}
