import NextAuth from "next-auth";

const handler = NextAuth({
  msg: "Works"
});

export { 
    handler as GET, 
    handler as POST 
};
