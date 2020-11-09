/**
 * News class
 */
import {ApiResponse} from "../api-response";

export class News extends ApiResponse{

  /**
   * News ID
   */
  _id: string;

  /**
   * News name
   */
  title: string;

  /**
   * News description
   */
  description: string;

  /**
   * News versions
   */
  author: string;

  /**
   * Is archived
   */
  archived: boolean;

  /**
   * News
   */

  /**
   * News date 'created at'
   */
  createdAt: string;

  /**
   * News date 'update at'
   */
  updatedAt: string;

}
