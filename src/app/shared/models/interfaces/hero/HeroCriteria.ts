import { PaginationParams } from "../PaginationMetadata";
import { HeroForm } from "./HeroForm";

export interface HeroCriteria extends PaginationParams {
  name?: HeroForm['name'];
  secretIdentity?: HeroForm['secretIdentity'];
  mainPower?: HeroForm['mainPower'];
  coincidence?: string;
}
