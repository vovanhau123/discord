const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const { CHANNEL_ID, DATABASE_PATH } = require("../config");
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(
  DATABASE_PATH,
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      console.error("Không thể kết nối đến cơ sở dữ liệu SQLite:", err.message);
    } else {
      console.log("Kết nối thành công đến cơ sở dữ liệu SQLite.");
    }
  }
);

module.exports = (client) => {
  client.once("ready", async () => {
    console.log("Bot is online!");
    db.get(
      "SELECT messageSent FROM BotStatus WHERE id = ?",
      ["unique-bot-id"],
      async (err, row) => {
        if (err) {
          return console.error(err.message);
        }
        if (!row || !row.messageSent) {
          const channel = await client.channels.fetch(CHANNEL_ID);
          if (channel) {
            const embed = new EmbedBuilder()
              .setColor(0x00ff00)
              .setTitle("Thành Phố Bemine Xin Chào!") // Đặt tiêu đề mới
              .setDescription(
                "Mong Bạn Dành Chút Thời Gian Để Đọc Qua Một Số Thủ Tục Để Nhập Cư Vào Thành Phố."
              ) // Đặt mô tả mới
              .addFields(
                {
                  name: "Yêu Cầu Cơ Bản Đăng Ký:",
                  value:
                    "Có Microphone Để Giao Lưu.\nKhông Được Sử Dụng Phần Mềm Thay Đổi Giọng Nói.\nVui Lòng Đọc Qua Những Điều Luật Của Thành Phố Bemine.\nTham Gia Thành Phố Vui Vẻ, Đoàn Kết.\nSau Khi Nộp Hồ Sơ Đăng Kí, Vui Lòng Đợi Trong Giây Lát.",
                },
                {
                  name: "Lưu Ý",
                  value:
                    "Vui Lòng Không Tag Ban Quản Trị Để Yêu Cầu Xét Duyệt Nhanh. Ban Quan Trị Sẽ Liên Hệ Sau Khi Xem Xét Hồ Sơ Của Bạn.",
                }
              )
              .setFooter({
                text: "By: Iqueen",
                iconURL:
                  "https://cdn.discordapp.com/attachments/1218623450592313495/1226585373367468043/418519978_1103594480635411_1775188527900980140_n.jpg?ex=66254da5&is=6612d8a5&hm=04ee40f8f56c6c6a7c4bc3e4fdba77853fbbac798c1ed235a3615cb0a3b3fa93&",
              })
              .setImage(
                "https://cdn.discordapp.com/attachments/1229486110695100507/1229545379427651665/Untitled_design_8.gif?ex=6630125e&is=661d9d5e&hm=c82410598accf932e72a643cc7b30a6e442e7cfb805f876266c7ef5e858ca751&"
              )
              .setTimestamp(); // Bạn có thể thêm các thuộc tính khác theo nhu cầu

            // Tạo ActionRowBuilder để chứa nút bấm
            const row = new ActionRowBuilder().addComponents(
              new ButtonBuilder()
                .setCustomId("open_form")
                .setLabel("Đăng Ký Ngay")
                .setStyle(ButtonStyle.Primary),
              new ButtonBuilder()
                .setCustomId("view_rules")
                .setLabel("Xem Rõ Luật Tại Đây")
                .setStyle(ButtonStyle.Danger)
            );

            await channel.send({
              embeds: [embed],
              components: [row],
            });

            db.run(
              "REPLACE INTO BotStatus (id, messageSent) VALUES (?, ?)",
              ["unique-bot-id", true],
              (err) => {
                if (err) {
                  return console.error(err.message);
                }
                console.log(
                  "Tin nhắn đã được gửi và trạng thái được lưu trong cơ sở dữ liệu."
                );
              }
            );
          } else {
            console.log(`Không tìm thấy kênh với ID: ${CHANNEL_ID}`);
          }
        } else {
          console.log("Tin nhắn đã được gửi trước đó.");
        }
      }
    );
  });
};
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isButton()) return;

  if (interaction.customId === "view_rules") {
    interaction.reply({
      content: "Bạn có thể xem luật tại đây: https://beminetlnt.com",
      ephemeral: true,
    });
  }
});
