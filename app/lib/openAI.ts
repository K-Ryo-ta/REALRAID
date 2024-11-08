"use server";
import OpenAI from "openai";

const openai = new OpenAI({
  organization: process.env.OPENAI_ORG,
  project: process.env.OPENAI_PROJECT_ID,
});

export const ReturnThemeJSONData = async (
  theme: string
): Promise<{ words: string[] } | null> => {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "ユーザーに与えられたテーマに基づいて、テーマに基づく単語のJSONデータを生成してください。例: テーマが「ハロウィン」の場合、ハロウィンに関連する単語をJSONデータで返してください。単語は全部で500個以上生成してください。単語はすべてひらがなで生成してください。",
      },
      {
        role: "user",
        content: `${theme}`,
      },
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "theme_words_schema",
        schema: {
          type: "object",
          properties: {
            words: {
              type: "array",
              items: {
                type: "string",
                description: "The words related to the given theme",
              },
            },
          },
          required: ["words"],
          additionalProperties: false,
        },
      },
    },
  });

  // completion.choices[0].message.contentをパースして、JSON形式で取得します。
  if (completion.choices[0].message.content) {
    const themeData = JSON.parse(completion.choices[0].message.content);

    // themeDataが期待した形式で返ってきているかを確認
    if (themeData && Array.isArray(themeData.words)) {
      return themeData as { words: string[] };
    } else {
      return null; // 型が一致しない場合にnullを返す
    }
  } else {
    throw new Error("テーマデータがnullで帰ってきました。");
  }
};
