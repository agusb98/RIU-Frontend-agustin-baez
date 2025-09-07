import { HeroForm } from './HeroForm';
import { HeroUpdate } from './HeroUpdate';

export interface HeroDetail {
  id: HeroUpdate['id'];
  name: HeroForm['name'];
  secretIdentity: HeroForm['secretIdentity'];
  mainPower: HeroForm['mainPower'];

  createdAt: HeroForm['createdAt'];
  updatedAt: HeroForm['updatedAt'];
}
