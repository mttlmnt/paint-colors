import Swatch from "./Swatch";

export default function ColorCard(props) {
  return (
    <div className="border rounded-md border-gray-200 bg-white p-4 flex flex-row items-center">
      <div className="pr-4">
        <h2 className="text-lg font-semibold w-28 text-gray-900">
          {props.colorInfo.name}
        </h2>
        <span className="text-sm font-extralight text-gray-600">
          {props.colorInfo.code}
        </span>
      </div>
      <Swatch colorRGB={props.colorInfo.rgb} />
    </div>
  );
}
