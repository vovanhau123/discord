function _0x1a1c() {
  const _0x354f56 = [
    "Điền\x20Thông\x20Tin",
    "now",
    "216566GlJDXU",
    "length",
    "addComponents",
    "Có\x20lỗi\x20xảy\x20ra\x20khi\x20cố\x20gắng\x20xóa\x20người\x20dùng.",
    "removeAllListeners",
    "35559DuEtDd",
    "error",
    "!uptime",
    "author",
    "15054TWusLI",
    "364DQuSJX",
    "9654601otxVwf",
    "floor",
    "bot",
    "affectedRows",
    "Vui\x20lòng\x20cung\x20cấp\x20ID\x20của\x20người\x20dùng.\x20Ví\x20dụ:\x20`/ban\x20<discord_id>`.",
    "Primary",
    "discord:",
    "content",
    "reply",
    "message",
    "setStyle",
    "693275vJWCQu",
    "split",
    "open_form",
    "4ENNmVy",
    "4557470pQvrjr",
    "279756kQDMuR",
    "18ojkVJt",
    "Nhấn\x20vào\x20button\x20bên\x20dưới\x20để\x20điền\x20thông\x20tin:",
    "392kAkVvj",
    "exports",
    "\x20phút,\x20và\x20",
  ];
  _0x1a1c = function () {
    return _0x354f56;
  };
  return _0x1a1c();
}
const _0x5932fe = _0x2a5b;
(function (_0x166330, _0x119e4f) {
  const _0x37b930 = _0x2a5b,
    _0x54326a = _0x166330();
  while (!![]) {
    try {
      const _0x2d160c =
        (parseInt(_0x37b930(0xbf)) / 0x1) * (parseInt(_0x37b930(0xc9)) / 0x2) +
        (parseInt(_0x37b930(0xc2)) / 0x3) * (-parseInt(_0x37b930(0xc1)) / 0x4) +
        parseInt(_0x37b930(0xbc)) / 0x5 +
        (parseInt(_0x37b930(0xaf)) / 0x6) * (-parseInt(_0x37b930(0xb0)) / 0x7) +
        (-parseInt(_0x37b930(0xc4)) / 0x8) * (parseInt(_0x37b930(0xab)) / 0x9) +
        -parseInt(_0x37b930(0xc0)) / 0xa +
        parseInt(_0x37b930(0xb1)) / 0xb;
      if (_0x2d160c === _0x119e4f) break;
      else _0x54326a["push"](_0x54326a["shift"]());
    } catch (_0x5ea03d) {
      _0x54326a["push"](_0x54326a["shift"]());
    }
  }
})(_0x1a1c, 0x3d0ae);
function _0x2a5b(_0x3d7a70, _0x315113) {
  const _0x1a1c2f = _0x1a1c();
  return (
    (_0x2a5b = function (_0x2a5bff, _0x1d1054) {
      _0x2a5bff = _0x2a5bff - 0xa7;
      let _0x1f8507 = _0x1a1c2f[_0x2a5bff];
      return _0x1f8507;
    }),
    _0x2a5b(_0x3d7a70, _0x315113)
  );
}
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
module[_0x5932fe(0xc5)] = (_0x48270a, _0x56441a) => {
  const _0x1c6345 = _0x5932fe,
    _0x45e6e3 = Date[_0x1c6345(0xc8)]();
  _0x48270a[_0x1c6345(0xaa)]("messageCreate"),
    _0x48270a["on"]("messageCreate", async (_0x62e05f) => {
      const _0x45f4f0 = _0x1c6345;
      if (
        !_0x62e05f[_0x45f4f0(0xae)][_0x45f4f0(0xb3)] &&
        _0x62e05f[_0x45f4f0(0xb8)] === _0x45f4f0(0xad)
      ) {
        const _0x56e9d2 = Date["now"](),
          _0x4fd3ad = _0x56e9d2 - _0x45e6e3,
          _0x18562b = Math[_0x45f4f0(0xb2)](_0x4fd3ad / (0x3e8 * 0x3c * 0x3c)),
          _0x15cb7f = Math[_0x45f4f0(0xb2)](
            (_0x4fd3ad / (0x3e8 * 0x3c)) % 0x3c
          ),
          _0x5b530c = Math["floor"]((_0x4fd3ad / 0x3e8) % 0x3c);
        await _0x62e05f["reply"](
          "Bot\x20đã\x20hoạt\x20động\x20được:\x20" +
            _0x18562b +
            "\x20giờ,\x20" +
            _0x15cb7f +
            _0x45f4f0(0xc6) +
            _0x5b530c +
            "\x20giây."
        );
      }
      if (
        !_0x62e05f[_0x45f4f0(0xae)][_0x45f4f0(0xb3)] &&
        _0x62e05f["content"] === "!form"
      ) {
        const _0x5a8d05 = new ActionRowBuilder()[_0x45f4f0(0xa8)](
          new ButtonBuilder()
            ["setCustomId"](_0x45f4f0(0xbe))
            ["setLabel"](_0x45f4f0(0xc7))
            [_0x45f4f0(0xbb)](ButtonStyle[_0x45f4f0(0xb6)])
        );
        await _0x62e05f["reply"]({
          content: _0x45f4f0(0xc3),
          components: [_0x5a8d05],
        });
      }
      if (
        !_0x62e05f["author"][_0x45f4f0(0xb3)] &&
        _0x62e05f["content"]["startsWith"]("/ban\x20")
      ) {
        const _0x3dbbcb = _0x62e05f[_0x45f4f0(0xb8)][_0x45f4f0(0xbd)]("\x20");
        if (_0x3dbbcb[_0x45f4f0(0xa7)] !== 0x2) {
          await _0x62e05f[_0x45f4f0(0xb9)](_0x45f4f0(0xb5));
          return;
        }
        const _0x36972e = _0x45f4f0(0xb7) + _0x3dbbcb[0x1];
        _0x56441a["query"](
          "DELETE\x20FROM\x20whitelisted_players\x20WHERE\x20discord_id\x20=\x20?",
          [_0x36972e],
          async (_0x27a129, _0x55290f) => {
            const _0x8ede5 = _0x45f4f0;
            if (_0x27a129)
              console[_0x8ede5(0xac)](
                "MySQL\x20query\x20error:\x20" + _0x27a129[_0x8ede5(0xba)]
              ),
                await _0x62e05f[_0x8ede5(0xb9)](_0x8ede5(0xa9));
            else
              _0x55290f[_0x8ede5(0xb4)] > 0x0
                ? await _0x62e05f[_0x8ede5(0xb9)](
                    "Người\x20dùng\x20đã\x20được\x20xóa\x20thành\x20công\x20khỏi\x20danh\x20sách."
                  )
                : await _0x62e05f["reply"](
                    "Không\x20tìm\x20thấy\x20người\x20dùng\x20với\x20ID\x20đó."
                  );
          }
        );
      }
    });
};
