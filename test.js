a = [
  {
    keyword: ["name"],
    question: "What is your name?",
  },
  {
    keyword: ["salary"],
    question: "What is your salary?",
  },
  {
    keyword: ["age"],
    question: "What is your age?",
  },
  {
    keyword: ["country"],
    question: "Tell me your country?",
  },
  {
    keyword: ["relationship"],
    question: "Are you single or committed",
  },
  {
    keyword: ["reason"],
    question: "Why did you leave your last job?",
  },
  {
    keyword: ["job"],
    question: "What is my job?",
  },
  {
    keyword: ["lover"],
    question: "Your lover name?",
  },
];

hellow = ["ae"].findIndex((i, index) => {
  console.log(i);
  return a.find((a1) => {
    console.log(a1);
    return a1.keyword.find((b) => {
      console.log(b);
      return i.includes(b);
    });
  });
});

aa = a.find((response) => {
  console.log(response);
  return response.keyword.some((eachKeyword) => {
    console.log(eachKeyword);
    return ["country", "hi"].find((split) => split.includes(eachKeyword));
  });
});

aa = a.find((response) =>
  response.keyword.some((eachKeyword) =>
    ["country", "hi"].find((split) => split.includes(eachKeyword))
  )
);
