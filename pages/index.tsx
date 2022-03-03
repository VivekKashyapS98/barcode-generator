import BwipJs from "bwip-js";
import type { NextPage } from "next";
import { ChangeEvent, FormEvent, useState } from "react";
import { BwitData } from "../utils/pages.types";

const Home: NextPage = () => {
  const [data, setData] = useState<BwitData>({
    bcid: "code128",
    text: "Text",
    scale: 2,
    height: 10,
    includeText: true,
    textXAlign: "center",
  });
  const [code, setCode] = useState<HTMLCanvasElement | null>(null);

  const generateCode = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let canvas = BwipJs.toCanvas("mycanvas", {
      bcid: data.bcid,
      text: data?.text,
      scale: data?.scale,
      height: data?.height,
      includetext: data?.includeText,
      textxalign: data?.textXAlign,
    });
    setCode(canvas);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    checkbox?: boolean
  ) => {
    if (checkbox) {
      setData((prev) => ({
        ...prev,
        [e.target.name]: !prev.includeText,
      }));
    } else {
      setData((prev) => ({
        ...prev,
        [e.target.name]: e.target?.value,
      }));
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <h1 className="text-2xl md:text-4xl text-center font-semibold p-5">
        BarCode Generator
      </h1>
      <div className="min-h-full bg-base-200 flex flex-wrap justify-around items-center">
        <form
          className="flex flex-col md:min-w-[400px]"
          onSubmit={generateCode}
        >
          <div className="form-control w-full max-w-full m-1">
            <label className="label">
              <span className="label-text">Barcode Type</span>
            </label>
            <select
              className="select w-full max-w-full"
              onChange={handleChange}
              name="bcid"
              value={data.bcid}
            >
              <option value="code128">Code 128</option>
              <option value="code16k">Code 16K</option>
              <option value="codeone">Code One</option>
              <option value="qrcode">QR Code</option>
            </select>
          </div>

          <div className="form-control w-full max-w-full m-1">
            <label className="label">
              <span className="label-text">Text to encode</span>
            </label>
            <input
              className="input w-full max-w-full"
              required
              type="text"
              name="text"
              value={data?.text}
              onChange={handleChange}
            />
          </div>

          <div className="form-control w-full max-w-full m-1">
            <label className="label">
              <span className="label-text">Scaling factor</span>
            </label>
            <input
              className="input w-full max-w-full"
              type="number"
              name="scale"
              value={data?.scale}
              onChange={handleChange}
            />
          </div>

          <div className="form-control w-full max-w-full m-1">
            <label className="label">
              <span className="label-text">Bar height</span>
            </label>
            <input
              className="input w-full max-w-full"
              type="number"
              name="height"
              value={data?.height}
              onChange={handleChange}
            />
          </div>

          <div className="form-control w-full max-w-full m-1">
            <label className="label">
              <span className="label-text">Text Position</span>
            </label>
            <select
              className="select w-full max-w-full"
              onChange={handleChange}
              name="textXAlign"
              value={data.textXAlign}
            >
              <option value="center">Center</option>
              <option value="left">Left</option>
              <option value="right">Right</option>
            </select>
          </div>

          <div className="form-control w-full max-w-full m-1">
            <label className="label cursor-pointer">
              <span className="label-text">Show human-readable text</span>
              <input
                type="checkbox"
                name="includeText"
                checked={data.includeText}
                onChange={(e) => handleChange(e, true)}
                className="checkbox"
              />
            </label>
          </div>
          <input className="btn btn-primary" type="submit" value="Generate" />
        </form>

        <div className="mockup-phone border-primary m-5">
          <div className="camera"></div>
          <div className="display">
            <div className="artboard artboard-demo phone-1">
              <canvas id="mycanvas">Loading...</canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
