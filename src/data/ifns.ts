import { ADDRESSES, Address, uniq } from "./addresses";

export type Ifns = {
  num: string;
  okrugs: string[];
  districts: string[];
  metros: string[];
  addresses: Address[];
  minPrice: number;
};

export const getIfns = (num: string): Ifns | undefined => {
  const addresses = ADDRESSES.filter((a) => a.ifns === num);
  if (!addresses.length) return undefined;
  const u = (k: keyof Address) => Array.from(new Set(addresses.map((a) => String(a[k]))));
  return {
    num,
    okrugs: u("okrug"),
    districts: u("district"),
    metros: u("metro"),
    addresses,
    minPrice: Math.min(...addresses.map((a) => a.price)),
  };
};

export const IFNS_LIST = uniq("ifns");

export const getIfnsDescription = (i: Ifns) => [
  `Инспекция Федеральной налоговой службы № ${i.num} по г. Москве обслуживает организации и предпринимателей, зарегистрированных в районах: ${i.districts.join(", ")} (${i.okrugs.join(", ")}). Именно в эту инспекцию компания будет сдавать отчётность и получать требования после регистрации по адресу из списка ниже.`,
  `Саму государственную регистрацию ООО и смену адреса в Москве проводит МИФНС № 46 — после неё компания автоматически встаёт на учёт в ИФНС № ${i.num}. Мы подбираем адреса, по которым инспекция не выносит отказов: собственник подтверждает аренду, а число компаний на адресе ограничено.`,
  `Адрес в ИФНС № ${i.num} удобен, если вам нужна конкретная инспекция — например, при переезде компании, для сохранения привычной налоговой или из-за близости к офису. Ближайшие станции метро: ${i.metros.join(", ")}.`,
];

export const ifnsTitle = (num: string) => `Юридический адрес в ИФНС № ${num} Москвы`;
