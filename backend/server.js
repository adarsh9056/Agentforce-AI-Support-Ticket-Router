require("dotenv").config();

const app = require("./src/app");
const { testConnection } = require("./src/config/db");

const PORT = process.env.PORT || 5000;

async function bootstrap() {
  await testConnection();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

bootstrap();
