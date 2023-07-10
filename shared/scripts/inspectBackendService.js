import { CreateBackendService } from "../services/backend/CreateBackendService.js";

const bservice = CreateBackendService();

const { booted } = bservice;
const {
  proxy: { registry },
} = bservice;
console.log(registry);
console.log(`BOOTED: ${booted}`);

process.exit();
