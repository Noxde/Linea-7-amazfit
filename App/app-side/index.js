import { MessageBuilder } from "../shared/message";

const messageBuilder = new MessageBuilder();

async function fetchCasa(ctx) {
  try {
    const resBody = await fetch("http://127.0.0.1:3000/casa")
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => ({
        code: 0,
      }));

    ctx.response({
      data: { result: resBody },
    });
  } catch (error) {
    ctx.response({
      data: { result: "ERROR" },
    });
  }
}

async function fetchFacultad(ctx) {
  try {
    const resBody = await fetch("http://127.0.0.1:3000/facultad")
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => ({
        code: 0,
      }));

    ctx.response({
      data: { result: resBody },
    });
  } catch (error) {
    ctx.response({
      data: { result: "ERROR" },
    });
  }
}

AppSideService({
  onInit() {
    messageBuilder.listen(() => {});

    messageBuilder.on("request", (ctx) => {
      const jsonRpc = messageBuilder.buf2Json(ctx.request.payload);
      if (jsonRpc.method === "GET_DATA") {
        return fetchData(ctx);
      }
    });
  },

  onRun() {},

  onDestroy() {},
});
