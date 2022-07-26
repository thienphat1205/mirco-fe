export interface ISearch {
  tab?: string;
  ticketType?: string | undefined;

  orderCode?: string;

  status?: string[];

  hubIds?: string[];

  created_from?: string;

  created_to?: string;
}
