import { DEVICE_WIDTH } from "../utils/config/device";

const logger = DeviceRuntimeCore.HmLogger.getLogger("fetch_api");
const { messageBuilder } = getApp()._options.globalData;
let arrivals;
let error;

Page({
  state: {},
  build() {
    hmUI.setScrollView(true, DEVICE_WIDTH, 2, false);
    // Button
    hmUI.createWidget(hmUI.widget.CIRCLE, {
      center_x: (DEVICE_WIDTH - 2) / 2,
      center_y: px(387),
      radius: 40,
      color: 0x383838,
    });
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: (DEVICE_WIDTH - px(44)) / 2,
      y: px(360),
      w: -1,
      h: -1,
      normal_src: "refresh.png",
      press_src: "refresh.png",
      click_func: (button_widget) => {
        logger.log("click button");
        this.fetchCasa();
      },
    });

    hmUI.createWidget(hmUI.widget.CIRCLE, {
      center_x: (DEVICE_WIDTH * 3 - 2) / 2,
      center_y: px(387),
      radius: 40,
      color: 0xc21717,
    });
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: (DEVICE_WIDTH * 3 - px(44)) / 2,
      y: px(360),
      w: -1,
      h: -1,
      normal_src: "refresh.png",
      press_src: "refresh.png",
      click_func: (button_widget) => {
        logger.log("click button");
        this.fetchFacultad();
      },
    });
  },
  fetchCasa() {
    if (error) {
      hmUI.deleteWidget(error);
    }
    const loading = hmUI.createWidget(hmUI.widget.TEXT, {
      x: DEVICE_WIDTH / 2 - 100,
      y: 90,
      w: 200,
      h: 50,
      color: 0xffffff,
      text_size: 36,
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text_style: hmUI.text_style.NONE,
      text: "Loading...",
    });
    messageBuilder
      .request({
        method: "GET_CASA",
      })
      .then((data) => {
        logger.log("receive data");
        const { result = {} } = data;
        if (result?.code == 0) {
          hmUI.deleteWidget(loading);
          error = hmUI.createWidget(hmUI.widget.TEXT, {
            x: DEVICE_WIDTH / 2 - 250,
            y: 90,
            w: DEVICE_WIDTH,
            h: 50,
            color: 0xffffff,
            text_size: 36,
            align_h: hmUI.align.CENTER_H,
            align_v: hmUI.align.CENTER_V,
            text_style: hmUI.text_style.NONE,
            text: "Could not reach the server",
          });
          return;
        }

        const dataList = result.arribos.map((x) => {
          return {
            linea: x.DescripcionLinea,
            arribo: x.Arribo,
          };
        });
        hmUI.deleteWidget(loading);
        if (arrivals) {
          arrivals.setProperty(hmUI.prop.UPDATE_DATA, {
            data_type_config: [
              { start: 0, end: dataList.length - 1, type_id: 1 },
            ],
            data_type_config_count: 1,
            data_array: dataList,
            data_count: dataList.length,
          });
        } else {
          arrivals = hmUI.createWidget(hmUI.widget.SCROLL_LIST, {
            x: DEVICE_WIDTH / 2 - 170,
            y: 90,
            w: 340,
            h: 230,
            item_space: 10,
            item_config: [
              {
                type_id: 1,
                item_bg_color: 0x1d3d66,
                item_bg_radius: 10,
                text_view: [
                  {
                    x: 0,
                    y: 0,
                    w: 100,
                    h: 100,
                    key: "linea",
                    color: 0xffffff,
                    text_size: 25,
                  },
                  {
                    x: 100,
                    y: 0,
                    w: 180,
                    h: 100,
                    key: "arribo",
                    color: 0xffffff,
                    text_size: 25,
                  },
                ],
                text_view_count: 2,
                item_height: 100,
              },
            ],
            item_config_count: 1,
            data_array: dataList,
            data_count: dataList.length,
          });
        }
      });
  },
  fetchFacultad() {
    if (error) {
      hmUI.deleteWidget(error);
    }
    const loading = hmUI.createWidget(hmUI.widget.TEXT, {
      x: (DEVICE_WIDTH * 3) / 2 - 100,
      y: 90,
      w: 200,
      h: 50,
      color: 0xffffff,
      text_size: 36,
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text_style: hmUI.text_style.NONE,
      text: "Loading...",
    });
    messageBuilder
      .request({
        method: "GET_FACULTAD",
      })
      .then((data) => {
        logger.log("receive data");
        const { result = {} } = data;
        if (result?.code == 0) {
          hmUI.deleteWidget(loading);
          error = hmUI.createWidget(hmUI.widget.TEXT, {
            x: (DEVICE_WIDTH * 3) / 2 - 250,
            y: 90,
            w: DEVICE_WIDTH,
            h: 50,
            color: 0xffffff,
            text_size: 36,
            align_h: hmUI.align.CENTER_H,
            align_v: hmUI.align.CENTER_V,
            text_style: hmUI.text_style.NONE,
            text: "Could not reach the server",
          });
          return;
        }

        const dataList = result.arribos.map((x) => {
          return {
            linea: x.DescripcionLinea,
            arribo: x.Arribo,
          };
        });
        hmUI.deleteWidget(loading);
        if (arrivals) {
          arrivals.setProperty(hmUI.prop.UPDATE_DATA, {
            data_type_config: [
              { start: 0, end: dataList.length - 1, type_id: 1 },
            ],
            data_type_config_count: 1,
            data_array: dataList,
            data_count: dataList.length,
          });
        } else {
          arrivals = hmUI.createWidget(hmUI.widget.SCROLL_LIST, {
            x: DEVICE_WIDTH / 2 - 170,
            y: 90,
            w: 340,
            h: 230,
            item_space: 10,
            item_config: [
              {
                type_id: 1,
                item_bg_color: 0x1d3d66,
                item_bg_radius: 10,
                text_view: [
                  {
                    x: 0,
                    y: 0,
                    w: 100,
                    h: 100,
                    key: "linea",
                    color: 0xffffff,
                    text_size: 25,
                  },
                  {
                    x: 100,
                    y: 0,
                    w: 180,
                    h: 100,
                    key: "arribo",
                    color: 0xffffff,
                    text_size: 25,
                  },
                ],
                text_view_count: 2,
                item_height: 100,
              },
            ],
            item_config_count: 1,
            data_array: dataList,
            data_count: dataList.length,
          });
        }
      });
  },
});
