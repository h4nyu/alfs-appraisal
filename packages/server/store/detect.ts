import axios, { AxiosInstance } from "axios";
import { zip } from "lodash"
import { Box } from "@sivic/core/box";
import { DetectStore } from "@sivic/core";
import { Row, Sql } from "postgres";

export const Store = (url: string): DetectStore => {
  const http = axios.create();
  http.defaults.baseURL = url;
  const box = async (payload: {
    data: string;
  }): Promise<Box[] | Error> => {
    try{
      // TODO: check box format
      const res = await http.post("/detect", {data:payload.data})
      const {image, boxes, confidences} = res.data
      return zip(boxes, confidences)
      .map((c:any) => {
        return Box({
          x0:c[0][0],
          y0:c[0][1],
          x1:c[0][2],
          y1:c[0][3],
        })
      }).map(b => Box({
        ...b,
        x0: b.x0 + b.width / 2,
        x1: b.x1 + b.width / 2,
        y0: b.y0 + b.height / 2,
        y1: b.y1 + b.height / 2,
      }))
    }catch(e) {
      return e
    }
  }
  return {
    box,
  };
};

export default Store
