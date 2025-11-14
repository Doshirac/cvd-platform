import { PrismaClient} from "@prisma/client";
import { Seed } from "./seeder/Seed";
import { logger } from "../src/utils/logger";
import { seedingMessages as msg} from "./seeder/constants/messages";

const main = async () => {
    const prisma = new PrismaClient();
    const seed = new Seed(prisma);

    try {
        await seed.run();
    } catch (err) {
        logger.error(`${msg.SEEDING_FAILED} ${err}`);
    } finally {
        await prisma.$disconnect();
    }
};

main();