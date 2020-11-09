const errorConstants = require("../../common/errorConstants");
//const intersectionArray = require("../../api/common/commonUtils").intersectionArray;
const utils = {};


/**
 * @apiDefine PaginationGroup
 * @apiParam (Pagination) {Number} [page] number of page to get
 * @apiParam (Pagination) {Number} [limit=20] number of slices to get
 * @apiParam (Pagination) {Number} [offset] start of slices to get
 *
 * @apiSuccess {Object[]} data       Array of objects.
 * @apiSuccess {Number} page number of page
 * @apiSuccess {Number} limit number of slices
 * @apiSuccess {Number} offset start of slices
 * @apiSuccess {Number} count start of slices
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "docs": [ // List of objects
 *          {_id: ....},
 *          {_id: ....},
 *       ],
 *       "page":0,
 *       "offset": 0,
 *       "limit": 10,
 *       "count": 2
 *     }
 */

utils.getAll = function (Schema, query, options, request, response, next, restrict_user) {
  const newObject = request.body;

  if (request.query.limit !== undefined && Number(request.query.limit) >= 0) {
    options.limit = Number(request.query.limit);
  }
  if (request.query.offset !== undefined && Number(request.query.offset) >= 0) {
    options.offset = Number(request.query.offset);
  } else if (request.query.page !== undefined && Number(request.query.page) >= 0) {
    options.page = Number(request.query.page);
  }
  if (options.lean === undefined) {
    options.lean = true
  }
  // Options you can pass
  // var options = {
  //   select: 'title date author',
  //   sort: { date: -1 },
  //   populate: 'author',
  //   lean: true,
  //   offset: 20,
  //   limit: 10
  // };

  for (const key in query) {
    if (query[key] === undefined) {
      delete query[key]
    }
  }
  Schema.filterQuery(request.user, function (error, filter) {

    if (error) {
      console.error("Error filtering query: " + error);
      return response.status(500).json(error);
    }
    query = {$and: [query, filter]};
    Schema.paginate(query, options, function (err, objects) {
      if (err) return dbError(err, request, response, next);
      response.json(objects);
    });
  });
};

utils.compareAll = function (Schema, query, options, request, response, next, restrict_user) {
  const newObject = request.body;

  for (const key in query) {
    if (query[key] === undefined) {
      delete query[key]
    }
  }
  Schema.filterQuery(request.user, function (error, filter) {

    if (error) {
      console.error("Error filtering query: " + error);
      return response.status(500).json(error);
    }
    query = {$and: [query, filter]};
    Schema.paginate(query, options, function (err, objects) {
      if (err) return dbError(err, request, response, next);
      response.json(objects);
    });
  });
};
// Filter & Sort utils

/*
*
* // FILTER
            let transform = {
                directQuery: {
                    "vetCenter": "vetCenter",
                    "owner": "owner",
                    "statuses": "statuses.status",
                },
                textQuery: {
                    language: request.headers["accept-language"]
                },
                other: {
                    active: {
                        _default: true,
                        _values: {
                            "false": false,
                            "all": "_delete",
                        }
                    },
                }
            };
            let query = route_utils.filterQuery(request.query, transform);
* */


utils.filterQuery = function (requestQuery, transform, query) {
  // First direct queries
  if (transform.directQuery) {
    Object.keys(transform.directQuery).forEach(function (element) {
      let queryValue = transform.directQuery[element];
      if (requestQuery[element]) {
        query[queryValue] = requestQuery[element];
        if (requestQuery[element].length !== 0 && element === 'rightVersion') {
          query["$or"] = [{
            textsLeft: {

            }, textsRight: {

            }, commonToBoth: { setIntersection: [ "$textsLeft", "$textsRight" ] }
          }]
        } else {
          if (Array.isArray(query[queryValue])) {
            query[queryValue] = {$in: query[queryValue]};
          }
          if (requestQuery[element] instanceof String && requestQuery[element].length === 0) { // if nosize, put a null for the query
            query[queryValue] = null;
          }
        }
      }
    });
  }

  // dateFilter
  if (transform.dateFilter) {
    let andVar = [];
    Object.keys(transform.dateFilter).forEach(function (element) {
      let value = requestQuery[element];
      let config = transform.dateFilter[element];
      if (value && config && Object.keys(config).length > 0) {
        let obj = {};
        let dbParam = Object.keys(config)[0];
        let operation = config[dbParam];
        let dateQuery = {};

        dateQuery[operation] = value;
        obj[dbParam] = dateQuery;
        andVar.push(obj);
      }
    });
    if (andVar.length > 0) {
      query["$and"] = andVar;
    }
  }


  // regexQuery
  if (transform.regexQuery) {
    Object.keys(transform.regexQuery).forEach(function (element) {
      let queryValue = transform.regexQuery[element];
      if (requestQuery[element]) {
        let escapedQuery = requestQuery[element].replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        let regexQuery = new RegExp(escapedQuery, 'i')
        query[queryValue] = {$regex: regexQuery};
        if (requestQuery[element] instanceof String && requestQuery[element].length === 0) { // if nosize, put a null for the query
          query[queryValue] = null;
        }
      }
    });
  }

  // textSearchQuery
  if (transform.textSearchQuery) {
    let orVar = [];
    let queryValue = requestQuery["textSearch"];
    transform.textSearchQuery.forEach(function (element) {
      if (queryValue) {
        let emptyObject = {};
        emptyObject[element] = {$regex: new RegExp(queryValue, 'i')};
        orVar.push(emptyObject);
      }
    });
    if (orVar.length > 0) {
      query["$or"] = orVar;
    }
  }

  // Then text search
  if (transform.textQuery) {
    if (requestQuery.texts !== undefined) {
      query['$text'] = {'$search': requestQuery.texts};
      if (transform.textQuery.language) {
        query['$text']['$language'] = transform.textQuery.language;
      }
    }
  }

  // then other transforms

  if (transform.other) {
    Object.keys(transform.other).forEach(function (element) {
      if (transform.other[element]["_default"] !== "_delete") { // If not delete
        query[element] = transform.other[element]["_default"]; // default value
      }
      let elementValue = requestQuery[element];
      if (requestQuery[element]) {
        let values = transform.other[element]["_values"]; // other values
        Object.keys(values).forEach(function (key) {
          if (elementValue === key) {
            let valueForKey = values[key];
            if (valueForKey !== "_delete") { // If not delete
              query[element] = valueForKey;
            } else {
              delete query[element]
            }
          }
        })
      }
    });
  }
  return query;
};

utils.sortQuery = function (requestSort, transform, sort) {
  if (!requestSort) {
    return transform["_default"] ? transform["_default"] : sort
  } // If no sort, exit
  if (Array.isArray(requestSort["field"]) &&
    Array.isArray(requestSort["order"]) &&
    requestSort["field"].length === requestSort["order"].length) {
    let reorderedSort = [];
    for (let i = 0; i < requestSort["field"].length; i++) {
      reorderedSort.push({
        field: requestSort["field"][i],
        order: requestSort["order"][i]
      })
    }
    requestSort = reorderedSort;
  }
  if (!Array.isArray(requestSort)) {
    requestSort = [requestSort]
  } // if not array, transform

  requestSort.forEach(function (sortElement) { // sort each element
    if (sortElement["field"] !== undefined) {
      let direction = 1;
      if (sortElement["order"] === "desc") { // maybe desc
        direction = -1;
      }
      let sortKey = transform[sortElement["field"]]; // add new sort key
      if (sortKey) {
        let newElement = [sortKey, direction];
        sort.push(newElement);
      }
    }
  });
  if (sort.length === 0) {
    if (transform["_default"]) {
      return transform["_default"];
    }
  }
  return sort;
};

module.exports = utils;
