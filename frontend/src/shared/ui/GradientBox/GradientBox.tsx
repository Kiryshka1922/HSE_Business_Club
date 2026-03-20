import styles from "./GradientBox.module.css";

interface GradientBoxProps {
  children: React.ReactNode;
  borderRadius?: number;
  borderWidth?: string;
  gradient?: string;
  backgroundColor?: string;
  className?: string;
}

export const GradientBox = ({
  children,
  borderRadius = 16,
  borderWidth = "2px",
  gradient = "linear-gradient(45deg, #1713e5, #050d47)",
  backgroundColor = "",
  className = "",
}: GradientBoxProps) => {
  return (
    <div
      className={`${styles.gradientBox} ${className}`}
      style={
        {
          "--border-radius": `${borderRadius + 2}px`,
          "--border-width": borderWidth,
          "--gradient": gradient,
        } as React.CSSProperties
      }
    >
      <div
        style={{
          backgroundColor,
          borderRadius,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default GradientBox;
