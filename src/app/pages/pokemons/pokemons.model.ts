import { Region } from 'src/shared/models/region.model';

export class Pokemon {
  public name: string;
  public id: number;
  public sprites: Sprites[];
  public stats: Stats[];
  public types: Types[];
  public specy: Specy;

  constructor() {}
}

export class Specy {
  public generation: Generation;
}

export class Generation {
  public region: Region;
}

export class Sprites {
  constructor(
    public back_default: string,
    public back_female: string,
    public back_shiny: string,
    public back_shiny_female: string,
    public front_female: string,
    public front_shiny: string,
    public front_shiny_female: string,
    public front_default?: string
  ) {}
}

export class Stats {
  constructor(
    public base_stat: number,
    public effort: 0 | 1 | 2 | 3,
    public stat: Stat
  ) {}
}

export class Stat {
  constructor(public name: string) {}
}

export class Types {
  constructor(public slot: number, public type: Type) {}
}

export class Type {
  constructor(public name: string) {}
}
