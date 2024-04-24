function _0x459b(_0x4b8717, _0x48c0e2) {
  const _0x413a55 = _0x413a();
  return (
    (_0x459b = function (_0x459b14, _0x11a232) {
      _0x459b14 = _0x459b14 - 0xaa;
      let _0x38a7ce = _0x413a55[_0x459b14];
      return _0x38a7ce;
    }),
    _0x459b(_0x4b8717, _0x48c0e2)
  );
}
const _0x4695b3 = _0x459b;
(function (_0x3685d1, _0x503329) {
  const _0x1ff892 = _0x459b,
    _0x501603 = _0x3685d1();
  while (!![]) {
    try {
      const _0x20026c =
        -parseInt(_0x1ff892(0xbf)) / 0x1 +
        (parseInt(_0x1ff892(0xac)) / 0x2) * (parseInt(_0x1ff892(0xaf)) / 0x3) +
        (parseInt(_0x1ff892(0xae)) / 0x4) * (parseInt(_0x1ff892(0xb9)) / 0x5) +
        -parseInt(_0x1ff892(0xb6)) / 0x6 +
        parseInt(_0x1ff892(0xaa)) / 0x7 +
        parseInt(_0x1ff892(0xb3)) / 0x8 +
        -parseInt(_0x1ff892(0xb7)) / 0x9;
      if (_0x20026c === _0x503329) break;
      else _0x501603["push"](_0x501603["shift"]());
    } catch (_0x3a7ada) {
      _0x501603["push"](_0x501603["shift"]());
    }
  }
})(_0x413a, 0xaf7e5);
const client = require(_0x4695b3(0xbc)),
  { BOT_TOKEN } = require(_0x4695b3(0xb1)),
  readyEvent = require(_0x4695b3(0xbb)),
  messageCreateEvent = require(_0x4695b3(0xab)),
  interactionCreateEvent = require(_0x4695b3(0xb5)),
  mysql = require("mysql"),
  mysqlConnection = mysql[_0x4695b3(0xad)]({
    host: _0x4695b3(0xb2),
    user: "root",
    password: "",
    database: _0x4695b3(0xb8),
  });
mysqlConnection[_0x4695b3(0xbe)]((_0x3e0699) => {
  const _0x43583c = _0x4695b3;
  _0x3e0699
    ? (console[_0x43583c(0xbd)](_0x43583c(0xb4), _0x3e0699),
      process["exit"](0x1))
    : console[_0x43583c(0xb0)]("Connected\x20to\x20MySQL\x20successfully");
});
const start = () => {
  readyEvent(client),
    messageCreateEvent(client, mysqlConnection),
    interactionCreateEvent(client),
    client["login"](BOT_TOKEN);
};
module[_0x4695b3(0xba)] = { start: start };
function _0x413a() {
  const _0x87422d = [
    "1249647aJuvZm",
    "log",
    "./config",
    "localhost",
    "3038216exAupm",
    "Error\x20connecting\x20to\x20MySQL:",
    "./events/interactionCreate",
    "1217946mInXLW",
    "7314462Ahtyms",
    "beminecity",
    "23620WoYSxR",
    "exports",
    "./events/ready",
    "./client/botClient",
    "error",
    "connect",
    "1033215NFLNxK",
    "4799578yKGiPz",
    "./events/messageCreate",
    "4pkSAoM",
    "createConnection",
    "736IldJmJ",
  ];
  _0x413a = function () {
    return _0x87422d;
  };
  return _0x413a();
}
