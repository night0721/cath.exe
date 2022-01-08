module.exports = {
  name: "choose",
  description: "Choose random things",
  usage: "(Choices)",
  category: "Fun",
  type: "CHAT_INPUT",
  options: [
    {
      type: 3,
      name: "first",
      description: "The first choice",
      required: true,
    },
    {
      type: 3,
      name: "second",
      description: "The second choice",
      required: true,
    },
    {
      type: 3,
      name: "third",
      description: "The third choice",
      required: false,
    },
    {
      type: 3,
      name: "forth",
      description: "The forth choice",
      required: false,
    },
    {
      type: 3,
      name: "fifth",
      description: "The fifth choice",
      required: false,
    },
    {
      type: 3,
      name: "sixth",
      description: "The sixth choice",
      required: false,
    },
    {
      type: 3,
      name: "seventh",
      description: "The seventh choice",
      required: false,
    },
    {
      type: 3,
      name: "eighth",
      description: "The eighth choice",
      required: false,
    },
    {
      type: 3,
      name: "ninth",
      description: "The ninth choice",
      required: false,
    },
    {
      type: 3,
      name: "tenth",
      description: "The tenth choice",
      required: false,
    },
  ],
  run: async (client, interaction, args) => {
    const choices = args[Math.floor(Math.random() * args.length)];
    interaction.followUp(`I will choose - \`${choices}\``);
  },
};
