// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", process.env.TOKEN!, {
        httpOnly: true,
        //   secure: process.env.NODE_ENV !== "development",
        maxAge: 60 * 60,
        sameSite: "strict",
        path: "/",
      })
    );
    res.statusCode = 200;
    res.json({ success: true });
  }
  if (req.method === "DELETE") {
    // res.removeHeader("Set-Cookie");
    // res.writeHead(302, { Location: '/api/login' });
    // res.end();

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", process.env.TOKEN!, {
        httpOnly: true,
        //   secure: process.env.NODE_ENV !== "development",
        maxAge: 0,
        sameSite: "strict",
        path: "/",
      })
    );
    res.statusCode = 200;
    res.json({ success: true });
  }
}
