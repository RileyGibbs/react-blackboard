import dynamic from "next/dynamic";

// Need this to use Kanva
const NoSSRComponent = dynamic(() => import("./draw-canvas"), {
  ssr: false,
});

export default function DrawCanvasSection(props) {
  return <NoSSRComponent />;
}