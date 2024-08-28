import { TreeNode } from "@lib/utils";
import BoltIcon from "@assets/icons/bolt.svg";
import EllipseIcon from "@assets/icons/ellipse.svg";
import { Image } from "@components/Image";
import MockImage1 from "@assets/images/mock-component-1.png";
import MockImage2 from "@assets/images/mock-component-2.png";
import SensorIcon from "@assets/icons/Sensor.svg";
import GatewayIcon from "@assets/icons/MdOutlineRouter.svg";

interface DisplayComponentProps {
  data: TreeNode;
}

const renderComponentHintIcon = (sensorType: string, status: string) => {
  if (sensorType === "energy") {
    return (
      <BoltIcon
        className={`bolt-icon ${status === "critical" ? "critical" : ""}`}
      />
    );
  }

  if (sensorType === "vibration") {
    return (
      <EllipseIcon
        className={`ellipse ${status === "critical" ? "critical" : ""}`}
      />
    );
  }

  return null;
};

export function DisplayComponent({ data }: Readonly<DisplayComponentProps>) {
  return (
    <div className="flex flex-col h-full">
      <h1 className="text-gray-darkest font-semibold font-inter text-lg px-4 py-3.5 flex gap-2 items-center border-b border-gray-lightest">
        {data.get("name")}
        <span>
          {renderComponentHintIcon(
            data.get("sensorType") as string,
            data.get("status") as string
          )}
        </span>
      </h1>

      <section className="p-6">
        <div className="flex gap-6">
          <Image
            src={
              data.get("sensorType") === "vibration" ? MockImage1 : MockImage2
            }
            alt="Machinery"
          />

          <div className="flex flex-col justify-center flex-1">
            <div>
              <h2 className="text-gray-darkest font-inter text-base font-semibold">
                Tipo de Equipamento
              </h2>
              <p className="mt-2 text-gray-medium font-inter text-base font-normal">
                Motor Elétrico (Trifásico)
              </p>
            </div>
            <hr className="w-full my-6 border-gray-lightest" />
            <div>
              <h2 className="text-gray-darkest font-inter text-base font-semibold">
                Responsáveis
              </h2>
              <p className="mt-2 text-gray-medium font-inter text-base font-normal">
                <span className="text-white font-inter text-sm font-normal bg-blue-primary px-1.5 py-0.5 rounded-full mr-2">
                  E
                </span>
                Motor Elétrico (Trifásico)
              </p>
            </div>
          </div>
        </div>

        <hr className="w-full my-6 border-gray-lightest" />

        <div className="flex justify-between gap-6">
          <div className="flex-1">
            <h2 className="text-gray-darkest font-inter text-base font-semibold">
              Sensor
            </h2>
            <p className="mt-2 text-gray-medium font-inter text-base font-normal">
              <SensorIcon className="mr-2" />
              {data.get("sensorId")}
            </p>
          </div>
          <div className="flex-1">
            <h2 className="text-gray-darkest font-inter text-base font-semibold">
              Receptor
            </h2>
            <p className="mt-2 text-gray-medium font-inter text-base font-normal">
              <GatewayIcon className="mr-2" />
              {data.get("gatewayId")}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
