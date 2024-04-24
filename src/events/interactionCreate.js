const {
  ActionRowBuilder,
  ButtonBuilder,
  EmbedBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ButtonStyle,
} = require("discord.js");
const db = require("../database/sqliteDb");
const mysql = require("mysql");
const {
  CHANNEL_ID,
  SUBMISSION_CHANNEL_ID,
  APPROVAL_CHANNEL_ID,
} = require("../config");
// Establish MySQL connection
const mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "beminecity",
});

mysqlConnection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    process.exit(1);
  } else {
    console.log("Connected to MySQL successfully");
    // Start the bot once MySQL connection is successful
  }
});
module.exports = (client) => {
  client.on("interactionCreate", async (interaction) => {
    if (interaction.isButton()) {
      await handleButtonInteraction(interaction, client);
    } else if (interaction.isModalSubmit()) {
      await handleModalSubmit(interaction, client);
    }
  });
};

async function handleButtonInteraction(interaction, client) {
  const { customId } = interaction;
  const parts = customId.split("_");
  const action = parts.length === 3 ? `${parts[0]}_${parts[1]}` : parts[0];
  const userIdForAction = parts.length === 3 ? parts[2] : parts[1];

  if (customId === "open_form") {
    db.get(
      `SELECT userId FROM user_submissions WHERE userId = ?`,
      [interaction.user.id],
      async (err, row) => {
        if (err) {
          console.error("Error when checking the database:", err.message);
          await interaction.reply({
            content: "Có lỗi xảy ra với bot, vui lòng liên hệ quản trị viên.",
            ephemeral: true,
          });
          return;
        }
        if (row) {
          await interaction.reply({
            content: "Thông tin của bạn đã được nhận. Cảm ơn!",
            ephemeral: true,
          });
        } else {
          const modal = new ModalBuilder()
            .setCustomId("personal_info_form")
            .setTitle("Thông Tin đăng kí whitelist")
            .addComponents(
              new ActionRowBuilder().addComponents(
                new TextInputBuilder()
                  .setCustomId("name_input")
                  .setLabel("Họ và tên")
                  .setPlaceholder("Nhập họ và tên của bạn")
                  .setStyle(TextInputStyle.Short)
              ),
              new ActionRowBuilder().addComponents(
                new TextInputBuilder()
                  .setCustomId("age_input")
                  .setLabel("Số tuổi")
                  .setPlaceholder("Nhập số tuổi (chỉ nhập số)")
                  .setStyle(TextInputStyle.Short)
              ),
              new ActionRowBuilder().addComponents(
                new TextInputBuilder()
                  .setCustomId("gender_input")
                  .setLabel("Giới tính")
                  .setPlaceholder(
                    "Nhập giới tính thật của bạn(Đừng cải trang nhé)"
                  )
                  .setStyle(TextInputStyle.Short)
              ),
              new ActionRowBuilder().addComponents(
                new TextInputBuilder()
                  .setCustomId("steam_input")
                  .setLabel("LINK STEAM")
                  .setPlaceholder(
                    "Hãy cung cấp link Steam của bạn để chúng tôi có thể duyệt cho bạn"
                  )
                  .setStyle(TextInputStyle.Short)
              ),
              new ActionRowBuilder().addComponents(
                new TextInputBuilder()
                  .setCustomId("nameDis_input")
                  .setLabel("Câu hỏi dành cho bạn")
                  .setPlaceholder("Lý do bạn muốn đến với Bemine City ?")
                  .setStyle(TextInputStyle.Paragraph)
              )
            );
          await interaction.showModal(modal).catch(console.error);
        }
      }
    );
  } else {
    switch (action) {
      case "approve":
        console.log(`Approving submission for userId: ${userIdForAction}`);
        db.get(
          `SELECT userId FROM user_submissions WHERE userId = ?`,
          [userIdForAction],
          async (err, row) => {
            if (err) {
              console.error("Error when checking the database:", err.message);
              await interaction.reply({
                content: "Có lỗi xảy ra khi kiểm tra cơ sở dữ liệu.",
                ephemeral: true,
              });
              return;
            }
            if (!row) {
              await interaction.reply({
                content: "Không tìm thấy thông tin người dùng để duyệt.",
                ephemeral: true,
              });
              return;
            }
            const submittedUserId = row.userId;
            const discordId = "discord:" + submittedUserId;
            mysqlConnection.query(
              "INSERT INTO whitelist (identifier) VALUES (?)",
              [discordId],
              function (error, results, fields) {
                if (error) throw error;
                // Neat!
              }
            );
            const approvalChannel = await client.channels.fetch(
              APPROVAL_CHANNEL_ID
            );
            const approvalEmbed = new EmbedBuilder()
              .setColor(0x00ff00)
              .setTitle("Thông Báo Duyệt Form và Cấp Role Người Dân")
              .setDescription(
                `Quản trị viên <@${interaction.user.id}> đã duyệt form của người dùng <@${submittedUserId}>.`
              )
              .setTimestamp();
            approvalChannel.send({ embeds: [approvalEmbed] });

            const NoticeApproved = new EmbedBuilder()
              .setTitle(`Tin Nhắn Từ Bemine City!`)
              .setDescription(
                "Chúc mừng! Hồ Sơ Của Bạn Đã Được Duyệt với role là **Công dân**. Hãy Cùng Tham Gia Vào Thành Phố Để Trải Qua Những Giây Phút Thư Giãn. Xin Cảm Ơn!."
              )
              .addFields({ name: `IP Server`, value: `<#1229494229940830229>` })
              .setColor("#0099ff")
              .setThumbnail(
                "https://cdn.discordapp.com/attachments/1222281580245159986/1223351591369834648/c453b482cd45717a61c7b7c77f9e517b.gif"
              );
            client.users.fetch(submittedUserId).then((userToNotify) => {
              userToNotify.send({ embeds: [NoticeApproved] });
            });

            const roleId = "1229488792138682479";
            const guildId = "1229484289855324220";
            const guild = client.guilds.cache.get(guildId);
            if (guild) {
              const member = await guild.members
                .fetch(submittedUserId)
                .catch(console.error);
              if (member) {
                await member.roles.add(roleId).catch(console.error);
              }
            }
            await interaction.update({
              content: "Thông tin đã được duyệt. ✅",
              components: [],
            });
          }
        );
        break;
      case "approve_gaixinh":
        console.log(`Approving 'Gái Xinh' role for userId: ${userIdForAction}`);
        db.get(
          `SELECT userId FROM user_submissions WHERE userId = ?`,
          [userIdForAction],
          async (err, row) => {
            if (err) {
              console.error("Error when checking the database:", err.message);
              await interaction.reply({
                content: "Có lỗi xảy ra khi kiểm tra cơ sở dữ liệu.",
                ephemeral: true,
              });
              return;
            }
            if (!row) {
              await interaction.reply({
                content: "Không tìm thấy thông tin người dùng để duyệt.",
                ephemeral: true,
              });
              return;
            }
            const submittedUserId = row.userId;
            const discordId = "discord:" + submittedUserId;
            mysqlConnection.query(
              "INSERT INTO whitelist (identifier) VALUES (?)",
              [discordId],
              function (error, results, fields) {
                if (error) throw error;
                // Neat!
              }
            );
            const approvalChannel = await client.channels.fetch(
              APPROVAL_CHANNEL_ID
            );
            const approvalEmbed = new EmbedBuilder()
              .setColor(0x00ff00)
              .setTitle("Thông Báo Duyệt Form và Cấp Role Gái Xinh")
              .setDescription(
                `Quản trị viên <@${interaction.user.id}> đã duyệt form của người dùng <@${submittedUserId}> và cấp role 'Gái Xinh'.`
              )
              .setTimestamp();
            approvalChannel.send({ embeds: [approvalEmbed] });

            const NoticeApproved = new EmbedBuilder()
              .setTitle(`Tin Nhắn Từ Bemine City!`)
              .setDescription(
                "Chúc mừng! Hồ Sơ Của Bạn Đã Được Duyệt với role là **Gái Xinh**. Hãy Cùng Tham Gia Vào Thành Phố Để Trải Qua Những Giây Phút Thư Giãn. Xin Cảm Ơn!."
              )
              .addFields({ name: `IP Server`, value: `<#1229494229940830229>` })
              .setColor("#0099ff")
              .setThumbnail(
                "https://cdn.discordapp.com/attachments/1222281580245159986/1223351591369834648/c453b482cd45717a61c7b7c77f9e517b.gif"
              );
            client.users.fetch(submittedUserId).then((userToNotify) => {
              userToNotify.send({ embeds: [NoticeApproved] });
            });

            const gaixinhRoleId = "1229487434178498570";
            const guildId = "1229484289855324220";
            const guild = client.guilds.cache.get(guildId);
            if (guild) {
              try {
                const member = await guild.members.fetch(submittedUserId);
                await member.roles.add(gaixinhRoleId);
                await interaction.update({
                  content:
                    'Thông tin đã được duyệt và role "Gái Xinh" đã được cấp. ✅',
                  components: [],
                });
              } catch (error) {
                console.error(error);
                await interaction.reply({
                  content: 'Có lỗi xảy ra khi cố gắng cấp role "Gái Xinh".',
                  ephemeral: true,
                });
              }
            }
          }
        );
        break;
      case "approve_bacsi":
        console.log(`Approving 'Bác sĩ' role for userId: ${userIdForAction}`);
        db.get(
          `SELECT userId FROM user_submissions WHERE userId = ?`,
          [userIdForAction],
          async (err, row) => {
            if (err) {
              console.error("Error when checking the database:", err.message);
              await interaction.reply({
                content: "Có lỗi xảy ra khi kiểm tra cơ sở dữ liệu.",
                ephemeral: true,
              });
              return;
            }
            if (!row) {
              await interaction.reply({
                content: "Không tìm thấy thông tin người dùng để duyệt.",
                ephemeral: true,
              });
              return;
            }
            const submittedUserId = row.userId;
            const discordId = "discord:" + submittedUserId;
            mysqlConnection.query(
              "INSERT INTO whitelist (identifier) VALUES (?)",
              [discordId],
              function (error, results, fields) {
                if (error) throw error;
                // Neat!
              }
            );
            const approvalChannel = await client.channels.fetch(
              APPROVAL_CHANNEL_ID
            );
            const approvalEmbed = new EmbedBuilder()
              .setColor(0x00ff00)
              .setTitle("Thông Báo Duyệt Form và Cấp Role Bác sĩ")
              .setDescription(
                `Quản trị viên <@${interaction.user.id}> đã duyệt form của người dùng <@${submittedUserId}> và cấp role 'Bác sĩ'.`
              )
              .setTimestamp();
            approvalChannel.send({ embeds: [approvalEmbed] });

            const NoticeApproved = new EmbedBuilder()
              .setTitle(`Tin Nhắn Từ Bemine City!`)
              .setDescription(
                "Chúc mừng! Hồ Sơ Của Bạn Đã Được Duyệt với role là **Bác Sĩ**. Hãy Cùng Tham Gia Vào Thành Phố Để Trải Qua Những Giây Phút Thư Giãn. Xin Cảm Ơn!."
              )
              .addFields({ name: `IP Server`, value: `<#1229494229940830229>` })
              .setColor("#0099ff")
              .setThumbnail(
                "https://cdn.discordapp.com/attachments/1222281580245159986/1223351591369834648/c453b482cd45717a61c7b7c77f9e517b.gif"
              );
            client.users.fetch(submittedUserId).then((userToNotify) => {
              userToNotify.send({ embeds: [NoticeApproved] });
            });

            const emsRoleId = "1229488493391249479";
            const guildId = "1229484289855324220";
            const guild = client.guilds.cache.get(guildId);
            if (guild) {
              try {
                const member = await guild.members.fetch(submittedUserId);
                await member.roles.add(emsRoleId);
                await interaction.update({
                  content:
                    'Thông tin đã được duyệt và role "Bác sĩ" đã được cấp. ✅',
                  components: [],
                });
              } catch (error) {
                console.error(error);
                await interaction.reply({
                  content: 'Có lỗi xảy ra khi cố gắng cấp role "Bác Sĩ".',
                  ephemeral: true,
                });
              }
            }
          }
        );
        break;
      case "approve_police":
        console.log(`Approving 'Police' role for userId: ${userIdForAction}`);
        db.get(
          `SELECT userId FROM user_submissions WHERE userId = ?`,
          [userIdForAction],
          async (err, row) => {
            if (err) {
              console.error("Error when checking the database:", err.message);
              await interaction.reply({
                content: "Có lỗi xảy ra khi kiểm tra cơ sở dữ liệu.",
                ephemeral: true,
              });
              return;
            }
            if (!row) {
              await interaction.reply({
                content: "Không tìm thấy thông tin người dùng để duyệt.",
                ephemeral: true,
              });
              return;
            }
            const submittedUserId = row.userId;
            const discordId = "discord:" + submittedUserId;
            mysqlConnection.query(
              "INSERT INTO whitelist (identifier) VALUES (?)",
              [discordId],
              function (error, results, fields) {
                if (error) throw error;
                // Neat!
              }
            );
            const approvalChannel = await client.channels.fetch(
              APPROVAL_CHANNEL_ID
            );
            const approvalEmbed = new EmbedBuilder()
              .setColor(0x00ff00)
              .setTitle("Thông Báo Duyệt Form và Cấp Role Police")
              .setDescription(
                `Quản trị viên <@${interaction.user.id}> đã duyệt form của người dùng <@${submittedUserId}> và cấp role 'Police'.`
              )
              .setTimestamp();
            approvalChannel.send({ embeds: [approvalEmbed] });

            const NoticeApproved = new EmbedBuilder()
              .setTitle(`Tin Nhắn Từ Bemine City!`)
              .setDescription(
                "Chúc mừng! Hồ Sơ Của Bạn Đã Được Duyệt với role là **Police**. Hãy Cùng Tham Gia Vào Thành Phố Để Trải Qua Những Giây Phút Thư Giãn. Xin Cảm Ơn!."
              )
              .addFields({ name: `IP Server`, value: `<#1229494229940830229>` })
              .setColor("#0099ff")
              .setThumbnail(
                "https://cdn.discordapp.com/attachments/1222281580245159986/1223351591369834648/c453b482cd45717a61c7b7c77f9e517b.gif"
              );
            client.users.fetch(submittedUserId).then((userToNotify) => {
              userToNotify.send({ embeds: [NoticeApproved] });
            });

            const policeRoleId = "1229488554443280385";
            const guildId = "1229484289855324220";
            const guild = client.guilds.cache.get(guildId);
            if (guild) {
              try {
                const member = await guild.members.fetch(submittedUserId);
                await member.roles.add(policeRoleId);
                await interaction.update({
                  content:
                    'Thông tin đã được duyệt và role "Police" đã được cấp. ✅',
                  components: [],
                });
              } catch (error) {
                console.error(error);
                await interaction.reply({
                  content: 'Có lỗi xảy ra khi cố gắng cấp role "Police".',
                  ephemeral: true,
                });
              }
            }
          }
        );
        break;
      case "approve_mechanic":
        console.log(`Approving 'Cứu Hộ' role for userId: ${userIdForAction}`);
        db.get(
          `SELECT userId FROM user_submissions WHERE userId = ?`,
          [userIdForAction],
          async (err, row) => {
            if (err) {
              console.error("Error when checking the database:", err.message);
              await interaction.reply({
                content: "Có lỗi xảy ra khi kiểm tra cơ sở dữ liệu.",
                ephemeral: true,
              });
              return;
            }
            if (!row) {
              await interaction.reply({
                content: "Không tìm thấy thông tin người dùng để duyệt.",
                ephemeral: true,
              });
              return;
            }
            const submittedUserId = row.userId;
            const discordId = "discord:" + submittedUserId;
            mysqlConnection.query(
              "INSERT INTO whitelist (identifier) VALUES (?)",
              [discordId],
              function (error, results, fields) {
                if (error) throw error;
                // Neat!
              }
            );
            const approvalChannel = await client.channels.fetch(
              APPROVAL_CHANNEL_ID
            );
            const approvalEmbed = new EmbedBuilder()
              .setColor(0x00ff00)
              .setTitle("Thông Báo Duyệt Form và Cấp Role Cứu Hộ")
              .setDescription(
                `Quản trị viên <@${interaction.user.id}> đã duyệt form của người dùng <@${submittedUserId}> và cấp role 'Cứu Hộ'.`
              )
              .setTimestamp();
            approvalChannel.send({ embeds: [approvalEmbed] });

            const NoticeApproved = new EmbedBuilder()
              .setTitle(`Tin Nhắn Từ Bemine City!`)
              .setDescription(
                "Chúc mừng! Hồ Sơ Của Bạn Đã Được Duyệt với role là **Cứu Hộ**. Hãy Cùng Tham Gia Vào Thành Phố Để Trải Qua Những Giây Phút Thư Giãn. Xin Cảm Ơn!."
              )
              .addFields({ name: `IP Server`, value: `<#1229494229940830229>` })
              .setColor("#0099ff")
              .setThumbnail(
                "https://cdn.discordapp.com/attachments/1222281580245159986/1223351591369834648/c453b482cd45717a61c7b7c77f9e517b.gif"
              );
            client.users.fetch(submittedUserId).then((userToNotify) => {
              userToNotify.send({ embeds: [NoticeApproved] });
            });

            const mechanicRoleId = "1229488590317162536";
            const guildId = "1229484289855324220";
            const guild = client.guilds.cache.get(guildId);
            if (guild) {
              try {
                const member = await guild.members.fetch(submittedUserId);
                await member.roles.add(mechanicRoleId);
                await interaction.update({
                  content:
                    'Thông tin đã được duyệt và role "Cứu Hộ" đã được cấp. ✅',
                  components: [],
                });
              } catch (error) {
                console.error(error);
                await interaction.reply({
                  content: 'Có lỗi xảy ra khi cố gắng cấp role "Cứu Hộ".',
                  ephemeral: true,
                });
              }
            }
          }
        );
        break;
      case "reject":
        const rejectReasonInput = new TextInputBuilder()
          .setCustomId("reject_reason")
          .setLabel("Lý do từ chối")
          .setStyle(TextInputStyle.Paragraph)
          .setPlaceholder("Nhập lý do từ chối ở đây...")
          .setRequired(true);
        const rejectModal = new ModalBuilder()
          .setCustomId(`reject_modal_${userIdForAction}`)
          .setTitle("Lý do từ chối")
          .addComponents(
            new ActionRowBuilder().addComponents(rejectReasonInput)
          );
        await interaction.showModal(rejectModal);
        break;
    }
  }
}

async function handleModalSubmit(interaction, client) {
  if (interaction.customId === "personal_info_form") {
    const userId = interaction.user.id;
    const name = interaction.fields.getTextInputValue("name_input");
    const ageInput = interaction.fields.getTextInputValue("age_input");
    const gender = interaction.fields.getTextInputValue("gender_input");
    const steam = interaction.fields.getTextInputValue("steam_input");
    const nameDis = interaction.fields.getTextInputValue("nameDis_input");

    const age = parseInt(ageInput);
    if (isNaN(age) || ageInput.length > 3) {
      await interaction.reply({
        content: 'Vui lòng nhập một số hợp lệ cho "Số tuổi".',
        ephemeral: true,
      });
      return;
    }

    const insertSql = `INSERT INTO user_submissions (userId, name, age, gender, steam, nameDis) VALUES (?, ?, ?, ?, ?, ?)`;
    const insertValues = [
      interaction.user.id,
      name,
      age,
      gender,
      steam,
      nameDis,
    ];

    db.run(insertSql, insertValues, async (err) => {
      if (err) {
        console.error("Error saving to the database:", err.message);
        await interaction.reply({
          content: "Có lỗi xảy ra khi ghi nhận thông tin gửi của bạn.",
          ephemeral: true,
        });
        return;
      }
      await interaction.reply({
        content: "Thông tin của bạn đã được ghi nhận. Cảm ơn!",
        ephemeral: true,
      });
      const submissionChannel = await client.channels.fetch(
        SUBMISSION_CHANNEL_ID
      );
      const infoEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle("Thông Tin đăng kí whitelist")
        .addFields(
          { name: "UserID", value: userId },
          { name: "Họ và tên", value: name },
          { name: "Số tuổi", value: age.toString() },
          { name: "Giới tính", value: gender },
          { name: "LINK STEAM", value: steam },
          { name: "TÊN DISCORD", value: nameDis }
        )
        .setTimestamp();

      // Tạo hàng hành động thứ nhất với 5 nút đầu tiên
      const row1 = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId(`approve_mechanic_${interaction.user.id}`)
          .setLabel("Role Cứu Hộ")
          .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
          .setCustomId(`approve_police_${interaction.user.id}`)
          .setLabel("Role Police")
          .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
          .setCustomId(`approve_bacsi_${interaction.user.id}`)
          .setLabel("Role Bác Sĩ")
          .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
          .setCustomId(`approve_gaixinh_${interaction.user.id}`)
          .setLabel("Role Gái Xinh")
          .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
          .setCustomId(`approve_${interaction.user.id}`)
          .setLabel("Role người dân")
          .setStyle(ButtonStyle.Success)
      );

      // Tạo hàng hành động thứ hai với nút thứ 6
      const row2 = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId(`reject_${interaction.user.id}`)
          .setLabel("Từ chối")
          .setStyle(ButtonStyle.Secondary)
      );

      // Gửi tin nhắn với cả hai hàng hành động
      submissionChannel.send({ embeds: [infoEmbed], components: [row1, row2] });
    });
  } else if (interaction.customId.startsWith("reject_modal_")) {
    const userIdForAction = interaction.customId.split("_")[2];
    const rejectReason = interaction.fields.getTextInputValue("reject_reason");
    db.get(
      `SELECT userId FROM user_submissions WHERE userId = ?`,
      [userIdForAction],
      async (err, row) => {
        if (err) {
          console.error("Error when checking the database:", err.message);
          await interaction.reply({
            content: "Có lỗi xảy ra khi kiểm tra cơ sở dữ liệu.",
            ephemeral: true,
          });
          return;
        }
        if (!row) {
          await interaction.reply({
            content: "Không tìm thấy thông tin người dùng để duyệt.",
            ephemeral: true,
          });
          return;
        }
        const submittedUserId = row.userId;

        const approvalChannel = await client.channels.fetch(
          APPROVAL_CHANNEL_ID
        );
        const rejectionEmbed = new EmbedBuilder()
          .setColor(0xff0000)
          .setTitle("Thông Báo Từ Chối Form")
          .setDescription(
            `Quản trị viên <@${interaction.user.id}> đã từ chối form của người dùng <@${submittedUserId}> với lý do: ${rejectReason}.`
          )
          .setTimestamp();

        await approvalChannel.send({ embeds: [rejectionEmbed] });

        const NoticeRejected = new EmbedBuilder()
          .setTitle(`Tin Nhắn Từ Bemine City!`)
          .setDescription(
            "Rất tiếc, Hồ Sơ Của Bạn Đã Được Không Đạt Yêu Cầu. Vui Lòng Xem xét lại Hồ Sơ Và Nộp Lại Cho Bemine City. Xin Cảm Ơn!"
          )
          .addFields({ name: `Lý do từ chối`, value: rejectReason })
          .setColor("#FF0000");

        try {
          const userToNotify = await client.users.fetch(submittedUserId);
          await userToNotify.send({ embeds: [NoticeRejected] });
        } catch (error) {
          console.error("Error sending private message to user:", error);
        }

        db.run(
          `DELETE FROM user_submissions WHERE userId = ?`,
          [submittedUserId],
          async (deleteErr) => {
            if (deleteErr) {
              console.error(
                "Error when deleting user submission:",
                deleteErr.message
              );
            }
          }
        );

        await interaction.reply({
          content: "Lý do từ chối đã được ghi nhận.",
          ephemeral: true,
        });
      }
    );
  }
}
