function _0x2f5a(_0x159aeb, _0x27ce50) {
  const _0x4e28e1 = _0x4e28();
  return (
    (_0x2f5a = function (_0x2f5adb, _0x49a0d7) {
      _0x2f5adb = _0x2f5adb - 0x1c7;
      let _0x373d04 = _0x4e28e1[_0x2f5adb];
      return _0x373d04;
    }),
    _0x2f5a(_0x159aeb, _0x27ce50)
  );
}
const _0x23b341 = _0x2f5a;
(function (_0x44d434, _0x53cee6) {
  const _0x875175 = _0x2f5a,
    _0x2391a4 = _0x44d434();
  while (!![]) {
    try {
      const _0x2a2d53 =
        parseInt(_0x875175(0x1cc)) / 0x1 +
        parseInt(_0x875175(0x1d2)) / 0x2 +
        (-parseInt(_0x875175(0x1cd)) / 0x3) *
          (-parseInt(_0x875175(0x1df)) / 0x4) +
        -parseInt(_0x875175(0x1c9)) / 0x5 +
        (-parseInt(_0x875175(0x1d3)) / 0x6) *
          (-parseInt(_0x875175(0x1d4)) / 0x7) +
        (-parseInt(_0x875175(0x1ce)) / 0x8) *
          (-parseInt(_0x875175(0x1d5)) / 0x9) +
        (-parseInt(_0x875175(0x1d8)) / 0xa) *
          (parseInt(_0x875175(0x1d6)) / 0xb);
      if (_0x2a2d53 === _0x53cee6) break;
      else _0x2391a4["push"](_0x2391a4["shift"]());
    } catch (_0x45a5a8) {
      _0x2391a4["push"](_0x2391a4["shift"]());
    }
  }
})(_0x4e28, 0xa25a9);
const sqlite3 = require("sqlite3")["verbose"](),
  { DATABASE_PATH } = require(_0x23b341(0x1c8)),
  db = new sqlite3[_0x23b341(0x1de)](
    DATABASE_PATH,
    sqlite3[_0x23b341(0x1db)] | sqlite3["OPEN_CREATE"],
    (_0x3c0c20) => {
      const _0x398a3b = _0x23b341;
      _0x3c0c20
        ? console[_0x398a3b(0x1cb)](
            _0x398a3b(0x1c7),
            _0x3c0c20[_0x398a3b(0x1d1)]
          )
        : (console[_0x398a3b(0x1da)](_0x398a3b(0x1d0)),
          db[_0x398a3b(0x1dc)](
            "CREATE\x20TABLE\x20IF\x20NOT\x20EXISTS\x20user_submissions\x20(\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20userId\x20TEXT\x20PRIMARY\x20KEY,\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20name\x20TEXT,\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20age\x20INTEGER,\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20gender\x20TEXT,\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20steam\x20TEXT,\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20nameDis\x20TEXT\x0a\x20\x20\x20\x20\x20\x20\x20\x20)",
            (_0x265873) => {
              const _0x508189 = _0x398a3b;
              _0x265873
                ? console[_0x508189(0x1cb)](
                    _0x508189(0x1d9),
                    _0x265873[_0x508189(0x1d1)]
                  )
                : console[_0x508189(0x1da)](_0x508189(0x1ca));
            }
          ),
          db["run"](_0x398a3b(0x1cf), (_0x20d334) => {
            const _0x12a62c = _0x398a3b;
            _0x20d334
              ? console["error"](_0x12a62c(0x1d7), _0x20d334[_0x12a62c(0x1d1)])
              : console["log"](_0x12a62c(0x1dd));
          }));
    }
  );
function _0x4e28() {
  const _0x4a54a1 = [
    "CREATE\x20TABLE\x20IF\x20NOT\x20EXISTS\x20BotStatus\x20(id\x20TEXT\x20PRIMARY\x20KEY,\x20messageSent\x20BOOLEAN)",
    "Kết\x20nối\x20thành\x20công\x20đến\x20cơ\x20sở\x20dữ\x20liệu\x20SQLite.",
    "message",
    "870370mueULq",
    "776838MCGAsM",
    "7OVWNJV",
    "335079eLnJrM",
    "11Zxfasr",
    "Lỗi\x20khi\x20tạo\x20bảng\x20BotStatus:",
    "8076470ngGkJa",
    "Lỗi\x20khi\x20tạo\x20bảng\x20user_submissions:",
    "log",
    "OPEN_READWRITE",
    "run",
    "Bảng\x20BotStatus\x20đã\x20được\x20tạo\x20hoặc\x20cập\x20nhật\x20thành\x20công.",
    "Database",
    "16priZtS",
    "Không\x20thể\x20kết\x20nối\x20đến\x20cơ\x20sở\x20dữ\x20liệu\x20SQLite:",
    "../config",
    "6505740uqvfXU",
    "Bảng\x20user_submissions\x20đã\x20được\x20tạo\x20hoặc\x20cập\x20nhật\x20thành\x20công.",
    "error",
    "919824dBgnZX",
    "799446fvLziv",
    "48qJVKYN",
  ];
  _0x4e28 = function () {
    return _0x4a54a1;
  };
  return _0x4e28();
}
module["exports"] = db;
