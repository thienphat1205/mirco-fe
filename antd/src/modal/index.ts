export interface ISearch {
  tab?: string;
  ticketType?: string | undefined;

  orderCode?: string;

  status?: string[];

  hubIds?: string[];

  created_from?: string;

  created_to?: string;
}

export interface IOptionSelect {
  value: string;
  label: string;
}

export interface IArea {
  area_name: string;
  description: string;

  area_code: string;

  active: boolean;

  hub_area_id: string;

  hub_id: string;
  layout: string;
  checkin_code: string;
}
