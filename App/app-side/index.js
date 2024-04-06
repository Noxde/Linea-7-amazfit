import { MessageBuilder } from "../shared/message";

const messageBuilder = new MessageBuilder();

async function fetchData(ctx) {
  try {
    const resBody = await fetch("http://127.0.0.1:3000")
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.log(err));

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
