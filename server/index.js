const fs = require("fs");
const express = require("express");
const app = express();
const { parseString } = require("xml2js");
const PORT = 3000;

app.use(express.json());

app.get("/facultad", async (req, res) => {
  let xmls = `<v:Envelope xmlns:i="http://www.w3.org/2001/XMLSchema-instance" xmlns:d="http://www.w3.org/2001/XMLSchema" xmlns:c="http://schemas.xmlsoap.org/soap/encoding/" xmlns:v="http://schemas.xmlsoap.org/soap/envelope/">
	<v:Header />
	<v:Body>
		<RecuperarProximosArribos xmlns="http://clsw.smartmovepro.net/" id="o0" c:root="1">
			<identificadorParada i:type="d:string">LP1926</identificadorParada>
			<codigoLineaParada i:type="d:int">367</codigoLineaParada>
			<codigoAplicacion i:type="d:int">24</codigoAplicacion>
			<localidad i:type="d:string">LA PLATA</localidad>
			<usuario i:type="d:string">WEB.LINEA7</usuario>
			<clave i:type="d:string">PAR.SW.WEB.LINEA7</clave>
			<isSublinea i:type="d:int">0</isSublinea>
		</RecuperarProximosArribos>
	</v:Body>
</v:Envelope>`;

  let response = await fetch(
    "http://clswbsas.smartmovepro.net/moduloparadas/swparadas.asmx",
    {
      method: "POST",
      headers: { "Content-Type": "text/xml" },
      body: xmls,
    }
  );

  let data = await response.text();

  parseString(data, (err, parsed) => {
    if (err) {
      return console.log(err);
    }
    const { "soap:Envelope": envelope } = parsed;
    const { "soap:Body": body } = envelope;
    const [{ RecuperarProximosArribosResponse: response }] = body;
    const [{ RecuperarProximosArribosResult: result }] = response;
    const [resultString] = result;

    const resultObject = JSON.parse(resultString);

    res.send(resultObject);
  });
});

app.get("/casa", async (req, res) => {
  console.log("Request");
  let xmls = `<v:Envelope xmlns:i="http://www.w3.org/2001/XMLSchema-instance" xmlns:d="http://www.w3.org/2001/XMLSchema" xmlns:c="http://schemas.xmlsoap.org/soap/encoding/" xmlns:v="http://schemas.xmlsoap.org/soap/envelope/"><v:Header /><v:Body><RecuperarProximosArribos xmlns="http://clsw.smartmovepro.net/" id="o0" c:root="1"><identificadorParada i:type="d:string">LP2820</identificadorParada><codigoLineaParada i:type="d:int">0</codigoLineaParada><codigoAplicacion i:type="d:int">24</codigoAplicacion><localidad i:type="d:string">LA PLATA</localidad><usuario i:type="d:string">WEB.LINEA7</usuario><clave i:type="d:string">PAR.SW.WEB.LINEA7</clave><isSublinea i:type="d:int">0</isSublinea></RecuperarProximosArribos></v:Body></v:Envelope>`;

  let response = await fetch(
    "http://clswbsas.smartmovepro.net/moduloparadas/swparadas.asmx",
    {
      method: "POST",
      headers: { "Content-Type": "text/xml" },
      body: xmls,
    }
  );

  let data = await response.text();

  parseString(data, (err, parsed) => {
    if (err) {
      return console.log(err);
    }
    const { "soap:Envelope": envelope } = parsed;
    const { "soap:Body": body } = envelope;
    const [{ RecuperarProximosArribosResponse: response }] = body;
    const [{ RecuperarProximosArribosResult: result }] = response;
    const [resultString] = result;

    const resultObject = JSON.parse(resultString);

    res.send(resultObject);
  });
});

app.listen(PORT);

console.log(`Listening on port ${PORT}`);
