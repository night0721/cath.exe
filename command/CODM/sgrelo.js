module.exports = {
  name: "sgrelo",
  description: "Calculate reload time for shotgun",
  options: [
    {
      type: 7,
      name: "gun",
      description: "Gun name",
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    let err = "",
      wrn = "",
      interpretedAs = [];
    function mather(inp) {
      const inpArr = interpreter(inp),
        outArr = [];
      inpArr.map((x, i, a) => {
        for (let j = i + 1; j < a.length; j++) {
          outArr.push(worker(x, a[j]));
        }
      });
      const aArr = outArr.map(x => x.a),
        iArr = outArr.map(x => x.i);
      return (
        "Input: `" +
        interpretedAs.join("`, `") +
        "`" +
        (aArr.length == 1
          ? "\nOpening and Closing Animation Time: " +
            beautifier(aArr[0]) +
            "\nReload Time: " +
            beautifier(iArr[0])
          : "\nAll Opening and Closing Animation Time: " +
            aArr.map(x => beautifier(x)).join(", ") +
            "\nAll Reload Time: " +
            iArr.map(x => beautifier(x)).join(", ") +
            "\nAverage Opening and Closing Animation Time: " +
            beautifier(aArr.reduce((t, x) => t + x, 0) / aArr.length) +
            "\nAverage Reload Time: " +
            beautifier(iArr.reduce((t, x) => t + x, 0) / iArr.length))
      );
    }

    function interpreter(inp) {
      let out = [
        ...new Set(
          inp
            .split(/\n|, |,/g)
            .filter(x => x)
            .map(x => x.toLowerCase().replace(/[^0-9a-z]/g, ""))
        ),
      ];
      out = out
        .map(x => {
          interpretedAs.push(x);
          const obj = {
            b: 0,
            f: 0,
          };
          if (
            x.split(/b/g).length > 2 ||
            x.split(/f/g).length > 2 ||
            x.split(/[a-z]/g).length > 3
          ) {
            err += "Unknown identifier `" + x + "`\n";
          } else if (x.indexOf("b") === -1 || x.indexOf("f") === -1) {
            err += "Missing identifier `" + x + "`\n";
          } else if (x.indexOf("b") === x.length - 1) {
            obj.b = parseFloat(x.split("f")[1].trim());
            obj.f = parseFloat(x.split("f")[0].trim());
          } else if (x.indexOf("f") === x.length - 1) {
            obj.b = parseFloat(x.split("b")[0].trim());
            obj.f = parseFloat(x.split("b")[1].trim());
          } else {
            err += "Unknown identifier `" + x + "`\n";
          }
          if (!obj.b && obj.f) {
            err += "Couldn't interpret `" + x + "`\n";
          } else if (!Number.isInteger(obj.b)) {
            err += "Decimal bullet count found `" + x + "`\n";
          } else if (!Number.isInteger(obj.f)) {
            wrn += "Decimal value found `" + x + "`\n";
          }
          return obj;
        })
        .filter(x => JSON.stringify(x).length && x);
      if (out.length === 1) {
        err += "Single equation found\n";
      }
      return err || !out.length ? [] : out;
    }

    function worker(o1, o2) {
      const out = {
        i: 0,
        a: 0,
      };
      out.i = (o1.f - o2.f) / (o1.b - o2.b);
      out.a = o1.f - out.i * o1.b;
      return out;
    }

    function beautifier(num) {
      return parseFloat(num.toFixed(2)).toString() + "s";
    }

    const msg = mather(args[0]);

    if (err !== "") {
      interaction.followUp(err);
    } else if (wrn !== "") {
      interaction.followUp({ content: wrn + "\n" + msg });
    } else {
      interaction.followUp({ content: msg });
    }
  },
};
