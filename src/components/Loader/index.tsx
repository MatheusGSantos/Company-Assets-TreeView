import { CSSProperties } from "react";
import { FadeLoader } from "react-spinners";

interface LoaderProps {
  color?: string;
}

const override: CSSProperties = {
  display: "block",
  height: "10px",
  width: "10px",
  marginBottom: "1px",
  scale: "0.25",
  position: "static",
};

export function Loader(props: Readonly<LoaderProps>) {
  return (
    <FadeLoader
      color={"#55A6FF"}
      loading={true}
      aria-label="Loading Spinner"
      cssOverride={override}
      {...props}
    />
  );
}
