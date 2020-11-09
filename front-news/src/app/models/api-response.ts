/**
 * Api response standard
 */
export class ApiResponse {

    /**
     * Array of any
     */
    docs: Array<any>;
  
    /**
     * Total number of firmwares
     */
    total: number;
  
    /**
     * Limit per page of firmwares
     */
    limit: number;
  
    /**
     * First firmware of array in one search
     */
    offset: number;
  
    /**
     * Number of page selected
     */
    page: number;
  
    /**
     * Total number of pages
     */
    pages: number;
  }
  