const request = require("request");

/**
 * IG Api Client
 * @param {String} options.indentifier
 * @param {String} options.password
 * @param {String} options.apiKey
 */
function Ig(options) {
    this.options = options;
}

/**
 * Retrieve security tokens
 */
Ig.prototype.session = async function() {

    return await this._rawRequest({
        method: "POST",
        url: "session",
        body: { identifier: this.options.identifier, password: this.options.password },
        parse: function(body, response) {
            return {
                xst: response.headers["x-security-token"],
                cst: response.headers["cst"],
                data: body
            }
        }
    });
};

/**
 * Get session tokens and request API
 */
Ig.prototype.request = async function(params) {
    const session = await this.session();

    params.headers = params.headers || {};
    Object.assign(params.headers, {
        "X-SECURITY-TOKEN": session.xst,
        "CST": session.cst,
    });

    return await this._rawRequest(params);
};

/**
 * Retrieve list of current positions
 */
Ig.prototype.getPositions = async function() {
    return await this.request({
        url: "positions",
        parse: function(body) {
            return body.positions;
        }
    });
};

/**
 * Retrieve the current balance
 * @returns {Promise<number>}
 */
Ig.prototype.checkBalance = async function() {
    const session = await this.session();
    return session.data.accountInfo.balance + session.data.accountInfo.profitLoss;
};

/**
 * @param {String} params.currencyCode
 * @param {String} params.direction
 * @param {String} params.epic
 * @param {Number} params.size
 * @param {Number} params.limitDistance
 * @param {Number} params.stopDistance
 */
Ig.prototype.deal = async function(params) {
    return await this.request({
        method: "POST",
        url: "positions/otc",
        body: {
            epic: params.epic,
            currencyCode: params.currencyCode,
            direction: params.direction,
            expiry: "-",
            size: params.size,
            limitDistance: params.limitDistance,
            stopDistance: params.stopDistance,
            orderType: "MARKET",
            guaranteedStop: false,
            timeInForce: "EXECUTE_AND_ELIMINATE",
            trailingStop: false,
            forceOpen: true
        }
    });
};

/**
 * @param {String} params.epic
 * @param {String} params.resolution
 * @param {Number} params.numPoints
 */
Ig.prototype.getData = async function(params) {
    return await this.request({
        method: "GET",
        version: 3,
        url: `prices/${params.epic}?resolution=${params.resolution}&max=${params.numPoints}&pageSize=0`
    })
};

Ig.prototype.getActivity = async function(params) {
    return await this.request({
        method: "GET",
        version: 1,
        url: `history/transactions/ALL_DEAL/${params.milliseconds}`
    });
};

/**
 * Receive the confirmation for a deal
 * @param {String} params.dealReference
 */
Ig.prototype.confirmation = async function(params) {
   return await this.request({
       method: "GET",
       version: 1,
       url: "confirms/" + params.dealReference
   })
};

/**
 * Basic method for all request to API
 * @param {String} params.url
 * @param {String} [params.method]
 * @param {Object} [params.headers]
 * @param {Object} [params.body]
 * @param {String} [params.version] API version
 * @param {Function} [params.parse] parsing function to be called with body and response
 * @private
 */
Ig.prototype._rawRequest = async function(params) {

    return new Promise((resolve, reject) => {
        request({
            method: params.method || "GET",
            url: "https://demo-api.ig.com/gateway/deal/" + params.url,
            json: true,
            body: params.body,
            headers: Object.assign({
                "X-IG-API-KEY": this.options.apiKey,
                "Version": params.version || 2
            }, params.headers || {})
        }, function(error, response, body) {
            if (error) {
                error.message = `${params.url} failed. ${error.message}`;
                reject(error);
            } else if (body.hasOwnProperty("errorCode")) {
                reject(new Error(`"${params.url}" request failed. Error code: ${body.errorCode}`));
            } else if (response.statusCode !== 400 && response.statusCode !== 200) {
                reject(new Error(`"${params.url}" request failed. Response status code: ${response.statusCode}`));
            }
            resolve(params.parse ? params.parse(body, response) : body);
        })
    });
};

module.exports = Ig;

