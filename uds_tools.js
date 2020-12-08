Element.prototype.remove = function () {
    this.parentElement.removeChild(this);
}

Element.prototype.clearChilds = function () {
    while (this.hasChildNodes()) {
        this.removeChild(this.lastChild);
    }
}
 
Array.prototype.contains = function (obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}

Array.prototype.intersect = function (arr) {
    return this.filter(function (e) {
        if (arr.indexOf(e) !== -1) return true;
    });
}

String.prototype.format = function (args) {
    var result = this;
    for (var i = 0; i < args.length; i++) {
        result = result.replace("{" + i + "}", args[i]);
    }
    return result;
}

String.prototype.toGuidString = function () {
    var result = this;
    result = result.replace("{", "").replace("}", "");
    return result;
}

String.prototype.toLowerCaseGuidString = function () {
    var result = this;
    result = result.toGuidString().toLowerCase();
    return result;
}

String.prototype.encodeXml = function () {
    return this.replace(/&/g, '&amp;')
               .replace(/</g, '&lt;')
               .replace(/>/g, '&gt;')
               .replace(/"/g, '&quot;')
               .replace(/'/g, '&apos;');
}

Date.prototype.toQueryString = function () {
    function AddZero(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }
    var result =
    this.getFullYear() + "-" +
    (this.getMonth() + 1) + "-" +
    this.getDate() + " " +
    AddZero(this.getHours()) + ":" +
    AddZero(this.getMinutes()) + ":" +
    AddZero(this.getSeconds());
    return result;
}

var UDS = UDS || {};
UDS.Log = UDS.Log || {};

UDS.IsEqualGuids = function (guid1, guid2) {
    /// <summary>
    /// Compares two GUIDs for equality
    /// </summary>
    /// <param name="guid1" type="String" mayBeNull="false" optional="false" >
    /// First GUID
    /// </param>
    /// <param name="guid2" type="String" mayBeNull="false" optional="false" >
    /// Second GUID
    /// </param>
    if ((typeof guid1 != "string") || (guid1.length == 0)) {
        throw new Error("UDS.IsEqualGuids guid1 parameter must be a non empty string.");
    }
    if ((typeof guid2 != "string") || (guid2.length == 0)) {
        throw new Error("UDS.IsEqualGuids guid2 parameter must be a non empty string.");
    }
    return guid1.toLowerCaseGuidString() == guid2.toLowerCaseGuidString();
}

UDS.Log.Error = function (message) {
    /// <summary>
    /// Outputs Error message to browser console, if supported
    /// </summary>
    /// <param name="message" type="String" mayBeNull="false" optional="false" >
    /// Message
    /// </param>
    this.Log("error", message);
}

UDS.Log.Warn = function (message) {
    /// <summary>
    /// Outputs Error message to browser console, if supported
    /// </summary>
    /// <param name="message" type="String" mayBeNull="false" optional="false" >
    /// Message
    /// </param>
    this.Log("warn", message);
}

UDS.Log.Info = function (message) {
    /// <summary>
    /// Outputs Error message to browser console, if supported
    /// </summary>
    /// <param name="message" type="String" mayBeNull="false" optional="false" >
    /// Message
    /// </param>
    this.Log("info", message);
}

UDS.Log.Debug = function (message) {
    /// <summary>
    /// Outputs Error message to browser console, if supported
    /// </summary>
    /// <param name="message" type="String" mayBeNull="false" optional="false" >
    /// Message
    /// </param>
    this.Log("debug", message);
}

UDS.Log.Log = function (level, message) {
    /// <summary>
    /// Outputs message to browser console, if supported
    /// </summary>
    /// <param name="level" type="String" mayBeNull="false" optional="true" >
    /// error, warn, info, debug
    /// </param>
    /// <param name="message" type="String" mayBeNull="false" optional="false" >
    /// Message
    /// </param>
    if (typeof console != "undefined") {
        switch (level) {
            case "error":
                console.error(message);
                break;

            case "warn":
                console.warn(message);
                break;

            case "info":
                console.info(message);
                break;

            case "debug":
                console.debug(message);
                break;

            default:
                console.log(message);
                break;
        }
    }
}

UDS.GetServerUrl = function () {
    var context = null;
    if (typeof Xrm != 'undefined') {
        context = Xrm.Page.context;
    }
    else if (typeof GetGlobalContext == 'function') {
        context = GetGlobalContext();
    }
    if (context) {
        return context.getClientUrl();
    }
    else {
        return null;
    }
};

UDS.GetODataUrl = function () {
    return UDS.GetServerUrl() + "/XRMServices/2011/OrganizationData.svc/";
};

UDS.GetOrgServiceUrl = function () {
    return UDS.GetServerUrl() + "/XRMServices/2011/Organization.svc/web";
};

UDS.AddEvent = function (elem, eventType, handler) {
    if (elem.addEventListener) {
        elem.addEventListener(eventType, handler, false);
    }
    else if (elem.attachEvent) {
        elem.attachEvent('on' + eventType, handler);
    }
};

UDS.AddIFrameOnLoadEvent = function (iframe, handler) {
    if (navigator.userAgent.indexOf("MSIE") > -1 && !window.opera) {
        UDS.AddEvent(iframe, "readystatechange", function () {
            if (iframe.readyState == "complete") {
                if (handler) {
                    handler(iframe);
                }
            }
        });
    }
    else {
        UDS.AddEvent(iframe, "load", function () {
            handler(iframe);
        });
    }
};

UDS.Trim = function (str) {
    var result = str;
    if (str) {
        result = str.replace(/^\s+|\s+$/g, '');
    }

    return result;
};

UDS.GetIframeWindow = function (iframeName) {
    var iframe = this.GetIframe(iframeName);

    return iframe && iframe.contentWindow ? iframe.contentWindow : window[iframeName];
},

UDS.GetIframe = function (iframeName) {
    return document.getElementById(iframeName);
};

UDS.SerializeForm = function (formElement) {
    var result = "";
    if (formElement && formElement.elements) {
        for (var i = 0; i < formElement.elements.length; i++) {
            var name = formElement.elements[i].name;
            var value = formElement.elements[i].value;
            if (formElement.elements[i].type == "checkbox" && !formElement.elements[i].checked)
                continue;
            if (name) {
                result += name + '=' + UDS.Trim(value);
                if (i != formElement.elements.length - 1) {
                    result += "&";
                }
            }
        }
    }

    return result;
};

UDS.ScrollToTop = function () {
    var bodyContainer = document.getElementById("formBodyContainer");
    if (bodyContainer) {
        bodyContainer.scrollTop = 0;
    }
};

UDS.GetEntityMetadata = function (entityName) {
    var result = UDS.GetEntityMetadata.Cache[entityName];
    if (!result) {
        var requestData =
            "<soap:Envelope xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/' xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:xsd='http://www.w3.org/2001/XMLSchema'>" +
                "<soap:Body>" +
                    "<Execute xmlns=\"http://schemas.microsoft.com/xrm/2011/Contracts/Services\" xmlns:i=\"http://www.w3.org/2001/XMLSchema-instance\">" +
                        "<request i:type=\"a:RetrieveEntityRequest\" xmlns:a=\"http://schemas.microsoft.com/xrm/2011/Contracts\">" +
                            "<a:Parameters xmlns:b=\"http://schemas.datacontract.org/2004/07/System.Collections.Generic\">" +
                                "<a:KeyValuePairOfstringanyType>" +
                                    "<b:key>EntityFilters</b:key>" +
                                    "<b:value i:type=\"c:EntityFilters\" xmlns:c=\"http://schemas.microsoft.com/xrm/2011/Metadata\">Entity</b:value>" +
                                "</a:KeyValuePairOfstringanyType>" +
                                "<a:KeyValuePairOfstringanyType>" +
                                    "<b:key>MetadataId</b:key>" +
                                    "<b:value i:type=\"c:guid\" xmlns:c=\"http://schemas.microsoft.com/2003/10/Serialization/\">00000000-0000-0000-0000-000000000000</b:value>" +
                                "</a:KeyValuePairOfstringanyType>" +
                                "<a:KeyValuePairOfstringanyType>" +
                                    "<b:key>RetrieveAsIfPublished</b:key>" +
                                    "<b:value i:type=\"c:boolean\" xmlns:c=\"http://www.w3.org/2001/XMLSchema\">false</b:value>" +
                                "</a:KeyValuePairOfstringanyType>" +
                                "<a:KeyValuePairOfstringanyType>" +
                                    "<b:key>LogicalName</b:key>" +
                                    "<b:value i:type=\"c:string\" xmlns:c=\"http://www.w3.org/2001/XMLSchema\">" + entityName + "</b:value>" +
                                "</a:KeyValuePairOfstringanyType>" +
                            "</a:Parameters>" +
                            "<a:RequestId i:nil=\"true\" />" +
                            "<a:RequestName>RetrieveEntity</a:RequestName>" +
                        "</request>" +
                    "</Execute>" +
                "</soap:Body>" +
            "</soap:Envelope>";

        var request = UDS.Request.SendRequest(UDS.GetOrgServiceUrl(),
        {
            method: "POST",
            async: false,
            data: requestData,
            callback: null,
            headers: {
                "Accept": "application/xml, text/xml, */*",
                "Content-Type": "text/xml; charset=utf-8",
                "SOAPAction": "http://schemas.microsoft.com/xrm/2011/Contracts/Services/IOrganizationService/Execute"
            }
        });

        var otcNodes = request.responseXML.getElementsByTagName("c:ObjectTypeCode");
        otcNodes = otcNodes.length != 0 ? otcNodes : request.responseXML.getElementsByTagName("ObjectTypeCode");

        var entityDisplayName = "Entity";
        var dnNodes = request.responseXML.getElementsByTagName("DisplayName");
        if (dnNodes.length > 0) {
            var userLocalizedNodes = dnNodes[0].getElementsByTagName("UserLocalizedLabel");
            if (userLocalizedNodes.length > 0) {
                var labelNodes = userLocalizedNodes[0].getElementsByTagName("Label");
                if (labelNodes.length > 0) {
                    entityDisplayName = labelNodes[0].textContent;
                }
            }
        }


        result = { ObjectTypeCode: otcNodes[0].textContent, DisplayName: entityDisplayName };
        UDS.GetEntityMetadata.Cache[entityName] = result;
    }

    return result;
};

UDS.ExecuteAction = function (entityId, entityName, requestName) {
    var requestXML = ""
    requestXML += "<s:Envelope xmlns:s=\"http://schemas.xmlsoap.org/soap/envelope/\">";
    requestXML += "  <s:Body>";
    requestXML += "    <Execute xmlns=\"http://schemas.microsoft.com/xrm/2011/Contracts/Services\" xmlns:i=\"http://www.w3.org/2001/XMLSchema-instance\">";
    requestXML += "      <request xmlns:a=\"http://schemas.microsoft.com/xrm/2011/Contracts\">";
    requestXML += "        <a:Parameters xmlns:b=\"http://schemas.datacontract.org/2004/07/System.Collections.Generic\">";
    requestXML += "          <a:KeyValuePairOfstringanyType>";
    requestXML += "            <b:key>Target</b:key>";
    requestXML += "            <b:value i:type=\"a:EntityReference\">";
    requestXML += "              <a:Id>" + entityId + "</a:Id>";
    requestXML += "              <a:LogicalName>" + entityName + "</a:LogicalName>";
    requestXML += "              <a:Name i:nil=\"true\" />";
    requestXML += "            </b:value>";
    requestXML += "          </a:KeyValuePairOfstringanyType>";
    requestXML += "        </a:Parameters>";
    requestXML += "        <a:RequestId i:nil=\"true\" />";
    requestXML += "        <a:RequestName>" + requestName + "</a:RequestName>";
    requestXML += "      </request>";
    requestXML += "    </Execute>";
    requestXML += "  </s:Body>";
    requestXML += "</s:Envelope>";

    try {
        var result = UDS.ActionExecutor.Execute(
                {
                    requestXml: requestXML,
                    async: false,
                    successCallback: null,
                    errorCallback: null
                });
        return result;
    } catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
};

UDS.IsFetchXmlValid = function (fetchXML) {
    var encodedFetch = fetchXML.encodeXml();
    var requestXML = ""
    requestXML += "<s:Envelope xmlns:s=\"http://schemas.xmlsoap.org/soap/envelope/\">";
    requestXML += "  <s:Body>";
    requestXML += "    <Execute xmlns=\"http://schemas.microsoft.com/xrm/2011/Contracts/Services\" xmlns:i=\"http://www.w3.org/2001/XMLSchema-instance\">";
    requestXML += "      <request xmlns:a=\"http://schemas.microsoft.com/xrm/2011/Contracts\">";
    requestXML += "        <a:Parameters xmlns:b=\"http://schemas.datacontract.org/2004/07/System.Collections.Generic\">";
    requestXML += "          <a:KeyValuePairOfstringanyType>";
    requestXML += "            <b:key>FetchXml</b:key>";
    requestXML += "            <b:value i:type=\"c:string\" xmlns:c=\"http://www.w3.org/2001/XMLSchema\">" + encodedFetch + "</b:value>";
    requestXML += "          </a:KeyValuePairOfstringanyType>";
    requestXML += "        </a:Parameters>";
    requestXML += "        <a:RequestId i:nil=\"true\" />";
    requestXML += "        <a:RequestName>FetchXmlToQueryExpression</a:RequestName>";
    requestXML += "      </request>";
    requestXML += "    </Execute>";
    requestXML += "  </s:Body>";
    requestXML += "</s:Envelope>";

    try {
        var result = UDS.ActionExecutor.Execute(
                {
                    requestXml: requestXML,
                    async: false,
                    successCallback: null,
                    errorCallback: null
                });
        return result;
    } catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
};

UDS.ClearOptionSet = function (attr) {
    var attribute = Xrm.Page.getAttribute(attr);
    var control = Xrm.Page.getControl(attr);
    if (attribute && attribute.getOptions && control && control.removeOption) {
        for (var i = 0; i < attribute.getOptions().length; i++) {
            control.removeOption(attribute.getOptions()[i].value);
        };
    }
    control.removeOption("");

    //IE fix
    if (control.get_editControlBehavior &&
        control.get_editControlBehavior() &&
        control.get_editControlBehavior().get_options &&
        control.get_editControlBehavior().get_options()) {
        control.get_editControlBehavior().get_options().length = 0
    }
};

UDS.UpdateOptionSet = function (field, availableValues, saveCurrentStatus, defaultValue) {
    var attribute = Xrm.Page.getAttribute(field);
    var control = Xrm.Page.getControl(field);
    var currentValue = attribute.getValue();
    var originalOptions = attribute.getOptions();
    this.ClearOptionSet(field);
    var originalOptionsObj = {};
    for (var i = 0, len = originalOptions.length; i < len; i++) {
        originalOptionsObj[originalOptions[i].value] = originalOptions[i];
    }
    if (saveCurrentStatus === true &&
        originalOptionsObj[currentValue] &&
        !availableValues.contains(currentValue)) {
        control.addOption(originalOptionsObj[currentValue]);
    }

    for (var i = 0, len = availableValues.length; i < len; i++) {
        if (originalOptionsObj[availableValues[i]]) {
            control.addOption(originalOptionsObj[availableValues[i]]);
        }
    }

    //IE fix
    if (control.get_editControlBehavior &&
        control.get_editControlBehavior() &&
        control.get_editControlBehavior().get_options &&
        control.get_editControlBehavior().get_options() &&
        control.get_editControlBehavior().get_options() != false &&
        control.get_editControlBehavior().get_options()[0].Text === "" &&
        control.get_editControlBehavior().set_options) {
        control.get_editControlBehavior().get_options().splice(0, 1);
        control.get_editControlBehavior().set_options(control.get_editControlBehavior().get_options());
    }

    var newCurrentValue = availableValues[0];

    if (defaultValue != null) {
        newCurrentValue = defaultValue;
    }
    else if (saveCurrentStatus === true) {
        newCurrentValue = currentValue;
    }

    attribute.setValue(newCurrentValue);
};

UDS.BuildQueryObject = function (query) {
    var result = {};
    var keyValues = query.split('&');
    for (var i = 0; i < keyValues.length; i++) {
        var pair = keyValues[i].split('=');
        result[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }

    return result;
};

UDS.SubmitReadOnlyFields = function (context) {
    Xrm.Page.ui.controls.forEach(function (control, index) {
        if (control.getAttribute) {
            var attribute = control.getAttribute();
            if (attribute.getIsDirty &&
                control.getDisabled) {
                if (attribute.setSubmitMode) {
                    if (attribute.getIsDirty() && control.getDisabled()) {
                        attribute.setSubmitMode("always");
                    }
                    else {
                        attribute.setSubmitMode("dirty");
                    }
                }
            }
        }
    });
};

UDS.IsFormValidationFailed = function () {
    var result = false;

    for (var i = 0, l = Xrm.Page.ui.controls.getLength() ; i < l; i++) {
        var control = Xrm.Page.ui.controls.get(i);
        if (control.get_validateResult) {
            var validateResult = control.get_validateResult();
            if (result = validateResult && !validateResult.isValid) {
                break;
            }
        }
    }

    return result;
};

UDS.CheckSaveStatus = function (context) {
    if (!context.getEventArgs().isDefaultPrevented()) {
        arguments.callee.SaveStatus = true;
    }
    else {
        arguments.callee.SaveStatus = false;
    }
};

UDS.SaveFormValues = function () {
    for (var i = 0, j = arguments.length; i < j; i++) {
        arguments.callee[arguments[i]] = Xrm.Page.getAttribute(arguments[i]).getValue();
    }
};

UDS.GetEntityMetadata.Cache = {};

UDS.Query = (function () {

    var ConditionExpressionFormats = {
        "OptionSet": "{0}/Value {1} {2}",
        "Bool": "{0} {1} {2}",
        "Money": "{0}/Value {1} {2}",
        "Int": "{0} {1} {2}",
        "Float": "{0} {1} {2}",
        "Decimal": "{0} {1} {2}",
        "Lookup": "{0}/Id {1} guid'{2}'",
        "Guid": "{0} {1} guid'{2}'",
        "String": "{0} {1} '{2}'",
        "DateTime": "{0} {1} datetime'{2}'",
        "Default": "{0} {1} {2}"
    };

    var QueryBuilder = function (entityName) {
        var self = this;

        self.EntityName = entityName;
        self.Columns = new Array();
        self.Expands = new Array();
        self.Order = new Array();
        self.RootFilter = null;
        self.SkipCount = null;
        self.TopCount = null;

        self.Select = function (column) {
            for (var i = 0; i < arguments.length; i++) {
                self.Columns.push(arguments[i]);
            }
            return self;
        }

        self.SetFilter = function (filter) {
            self.RootFilter = filter;
        }

        self.Filter = function (logicalOperator) {
            self.RootFilter = new FilterExpression(logicalOperator, self);
            return self.RootFilter.GetQueryBuilder();
        }

        self.ExpandMany = function (relationshipSchemaNames) {
            self.Expands = self.Expands.concat(relationshipSchemaNames);
            return self;
        }

        self.Expand = function (relationshipSchemaName) {
            self.Expands.push(relationshipSchemaName);
            return self;
        }

        self.OrderBy = function (attributeSchemaName, order) {
            order = (order) ? order : "asc";
            self.Order.push(attributeSchemaName + " " + order);

            return self;
        }

        self.Top = function (top) {
            self.TopCount = top;

            return self;
        }

        self.Skip = function (skip) {
            self.SkipCount = skip;

            return self;
        }

        self.BuildBaseUrlPart = function () {
            return UDS.GetODataUrl();
        }

        self.BuildEntitySetPart = function () {
            return self.EntityName + "Set";
        }

        self.BuildSelectPart = function () {
            var result = "";

            if (self.Columns.length > 0) {
                result += "$select=";

                for (var i = 0; i < self.Columns.length; i++) {
                    result += self.Columns[i];

                    if ((self.Columns.length - 1) != i) {
                        result += ",";
                    }
                }
            }

            return result;
        }

        self.BuildExpandPart = function () {
            var result = "";

            if (self.Expands.length > 0) {
                result += "$expand=";

                for (var i = 0; i < self.Expands.length; i++) {
                    result += self.Expands[i];

                    if ((self.Expands.length - 1) != i) {
                        result += ",";
                    }
                }
            }

            return result;
        }

        self.BuildTopPart = function () {
            return (self.TopCount) ? "$top=" + self.TopCount : "";
        }

        self.BuildSkipPart = function () {
            return (self.SkipCount) ? "$skip=" + self.SkipCount : "";
        }

        self.BuildOrderByPart = function () {
            var result = "";

            if (self.Order.length > 0) {
                result += "$orderby=";

                for (var i = 0; i < self.Order.length; i++) {
                    result += self.Order[i];

                    if ((self.Order.length - 1) != i) {
                        result += ",";
                    }
                }
            }

            return result;
        }

        self.BuildFilterPart = function () {
            var result = "";

            if (self.RootFilter != null) {
                result += ((self.RootFilter.ConditionsCount() > 0) || (self.RootFilter.FiltersCount() > 0)) ? "$filter=" : "";
                result += self.RootFilter.ToQueryPart();
            }

            return result;
        }

        self.ToUrl = function () {
            var entitySetUrl = self.BuildBaseUrlPart() +
                self.BuildEntitySetPart();

            var conditionUrl = self.BuildSelectPart();
            conditionUrl = self.MergeUrlParts(self.BuildExpandPart(), conditionUrl);
            conditionUrl = self.MergeUrlParts(self.BuildSkipPart(), conditionUrl);
            conditionUrl = self.MergeUrlParts(self.BuildTopPart(), conditionUrl);
            conditionUrl = self.MergeUrlParts(self.BuildOrderByPart(), conditionUrl);
            conditionUrl = self.MergeUrlParts(self.BuildFilterPart(), conditionUrl);

            return entitySetUrl + ((conditionUrl.length > 0) ? "?" : "") + conditionUrl;
        }

        self.MergeUrlParts = function (newPart, parts) {
            var result = parts;

            if (newPart.length > 0) {
                result += ((result.length > 0) ? "&" : "") + newPart;
            }

            return result;
        }

        return {
            SetFilter: self.SetFilter,
            Select: self.Select,
            Expand: self.Expand,
            ExpandMany: self.ExpandMany,
            OrderBy: self.OrderBy,
            Top: self.Top,
            Skip: self.Skip,
            Filter: self.Filter,
            ToUrl: self.ToUrl
        }
    }

    var FilterExpression = function (logicalOperator, queryBuilder) {
        var self = this;

        self.QueryBuilder = queryBuilder;

        self.LogicalOperator = logicalOperator;
        self.Filters = new Array();
        self.Conditions = new Array();

        self.AddCondition = function (condition) {
            self.Conditions.push(condition);
        }

        self.AddFilter = function (filter) {
            return self.Filters.push(filter);
        }

        self.ConditionsCount = function () {
            return self.Conditions.length;
        }

        self.FiltersCount = function () {
            return self.Filters.length;
        }

        self.Filter = function (logicalOperator) {
            var filter = new FilterExpression(logicalOperator, self.QueryBuilder);
            self.Filters.push(filter);
            return filter.GetQueryBuilder();
        }

        self.Condition = function (attributeSchemaName, conditionOperator, value, attributeType) {
            var condition = new ConditionExpression(attributeSchemaName, conditionOperator, value, attributeType, self.QueryBuilder);
            self.Conditions.push(condition);
            return condition.GetQueryBuilder();
        }

        self.GetQueryBuilder = function () {
            self.QueryBuilder.Filter = self.Filter;
            self.QueryBuilder.Condition = self.Condition;

            return self.QueryBuilder;
        }

        self.ToQueryPart = function () {
            var isParenthesesNeed = (self.Conditions.length > 1) || (self.Filters.length > 1) || ((self.Conditions.length > 0) && (self.Filters.length > 0));

            var result = isParenthesesNeed ? "(" : "";
            for (var i = 0; i < self.Filters.length; i++) {
                result += self.Filters[i].ToQueryPart();
                if ((self.Filters.length - 1) != i || (self.Conditions.length > 0)) {
                    result += " " + self.LogicalOperator + " ";
                }
            }
            for (var i = 0; i < self.Conditions.length; i++) {
                result += self.Conditions[i].ToQueryPart();
                if ((self.Conditions.length - 1) != i) {
                    result += " " + self.LogicalOperator + " ";
                }
            }
            result += isParenthesesNeed ? ")" : "";

            return result;
        }

        return {
            AddCondition: self.AddCondition,
            AddFilter: self.AddFilter,
            Condition: self.Condition,
            Filter: self.Filter,
            ConditionsCount: self.ConditionsCount,
            FiltersCount: self.FiltersCount,
            GetQueryBuilder: self.GetQueryBuilder,
            ToQueryPart: self.ToQueryPart
        }
    }

    var ConditionExpression = function (attributeSchemaName, conditionOperator, value, attributeType, queryBuilder) {
        var self = this;

        self.QueryBuilder = queryBuilder;

        self.AttributeType = attributeType;
        self.AttributeSchemaName = attributeSchemaName;
        self.ConditionOperator = conditionOperator;
        self.Value = value;

        self.GetQueryBuilder = function () {
            return self.QueryBuilder;
        }

        self.GetConditionExpressionFormat = function (attributeType) {
            return ConditionExpressionFormats[attributeType] != undefined ?
                ConditionExpressionFormats[attributeType] : ConditionExpressionFormats["Default"];
        }

        self.ToQueryPart = function () {
            return self.GetConditionExpressionFormat(self.AttributeType).format([self.AttributeSchemaName, self.ConditionOperator, self.Value]);
        }

        return {
            GetQueryBuilder: self.GetQueryBuilder,
            ToQueryPart: self.ToQueryPart
        }
    }

    var QueryExecutor = function (queryBuilder) {
        var self = this;

        self.QueryBuilder = queryBuilder;

        self.Method = "GET";
        self.Async = false;
        self.Data = null;
        self.Callback = null;
        self.Headers = { "Accept": "application/json" };

        self.Config = function (conf) {
            if (conf) {
                self.Method = (conf.method) ? conf.method : self.Method;
                self.Async = (conf.async) ? conf.async : self.Async;
                self.Data = (conf.data) ? conf.data : self.Data;
                self.Callback = (conf.callback) ? conf.callback : self.Callback;
                self.Headers = (conf.headers) ? conf.headers : self.Headers;
            }
        }

        self.Retrieve = function () {
            var request = UDS.Request.SendRequest(self.QueryBuilder.ToUrl(),
                {
                    method: self.Method,
                    async: self.Async,
                    data: self.Data,
                    callback: self.Callback,
                    headers: self.Headers
                });

            var result = null;
            if ((request.readyState == 4) && (request.status == 200)) {
                var resultJson = eval('(' + request.responseText + ')');
                result = (resultJson.d.results[0]) ? resultJson.d.results[0] : result;
            }

            return result;
        }

        self.RetrieveMultiple = function () {
            var request = UDS.Request.SendRequest(self.QueryBuilder.ToUrl(),
                {
                    method: self.Method,
                    async: self.Async,
                    data: self.Data,
                    callback: self.Callback,
                    headers: self.Headers
                });

            var result = new Array();
            if ((request.readyState == 4) && (request.status == 200)) {
                var resultJson = eval('(' + request.responseText + ')');
                result = (resultJson.d.results) ? resultJson.d.results : result;
            }

            return result;
        }

        return {
            Config: self.Config,
            Retrieve: self.Retrieve,
            RetrieveMultiple: self.RetrieveMultiple
        }
    }

    return {
        QueryBuilder: QueryBuilder,
        QueryExecutor: QueryExecutor,
        FilterExpression: FilterExpression,
        ConditionExpression: ConditionExpression
    }
}());

UDS.Request = (function () {
    var self = this;

    self.GetRequestObject = function () {
        var xmlHttp;
        try {
            // Firefox, Opera 8.0+, Safari
            xmlHttp = new XMLHttpRequest();
        }
        catch (e) {
            // Internet Explorer
            try {
                xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
            }
            catch (e) {
                try {
                    xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
                }
                catch (e) {
                    alert("Your browser does not support AJAX!");
                    return false;
                }
            }
        }
        return xmlHttp;
    }

    self.SendRequest = function (url, config) {
        var request = self.GetRequestObject();
        request.open(config.method, url, config.async);
        if (config.callback) {
            request.onreadystatechange = function () {
                if (request.readyState == 4) {
                    config.callback(request);
                }
            }
        }
        if (config.headers) {
            for (var header in config.headers) {
                if (config.headers.hasOwnProperty(header)) {
                    request.setRequestHeader(header, config.headers[header]);
                }
            }

            /*
            Object.getOwnPropertyNames(config.headers).forEach(
                function(element, index, array) {
                    request.setRequestHeader(element, config.headers[element]);
                }
            );
            */
        }
        request.send(config.data);

        return request;
    }

    return {
        GetRequestObject: self.GetRequestObject,
        SendRequest: self.SendRequest
    }
}());

UDS.Security = (function () {
    var self = this;

    self.IsAdmin = function () {
        return self.IsUserInRole("System Administrator");
    }

	self.IsPortalManager = function ()
	{
		return self.IsUserInRole("Portal Manager");
	}
    self.IsUserInRole = function (roleName) {
        var result = false;

        if (roleName) {
            result = self.GetUserRoles().contains(roleName);
        }

        return result;
    }

    self.GetUserRoles = function () {
        if (!self.GetUserRoles.CachedResult) {
            var result = new Array();

            var userRolesId = Xrm.Page.context.getUserRoles();

            var query = new UDS.Query.QueryBuilder("Role")
                .Select("Name")
                .Filter("or");

            for (var i = 0; i < userRolesId.length; i++) {
                query.Condition("RoleId", "eq", userRolesId[i].toGuidString(), "Guid");
            }

            var roles = new UDS.Query.QueryExecutor(query).RetrieveMultiple();

            for (var i = 0; i < roles.length; i++) {
                result.push(roles[i].Name);
            }

            self.GetUserRoles.CachedResult = result;
        }

        return self.GetUserRoles.CachedResult;
    }

    return {
        IsAdmin: self.IsAdmin,
        IsUserInRole: self.IsUserInRole,
        GetUserRoles: self.GetUserRoles,
        IsPropertyManager: self.IsPortalManager
    }
}());

UDS.ActionExecutor = {
    Execute: function (opts) {
        var req = UDS.Request.GetRequestObject();
        req.open("POST", this.GetServiceUrl(), opts.async);

        try {
            req.responseType = 'msxml-document';
        }
        catch (e) { }
        req.setRequestHeader("Accept", "application/xml, text/xml, */*");
        req.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
        req.setRequestHeader("SOAPAction", "http://schemas.microsoft.com/xrm/2011/Contracts/Services/IOrganizationService/Execute");
        if (opts.async && opts.successCallback) {
            req.onreadystatechange = function () {
                if (req.readyState == 4) { // "complete"
                    if (req.status == 200) { // "OK"
                        UDS.ActionExecutor.ProcessSoapResponse(req.responseXML, opts.successCallback, opts.errorCallback);
                    }
                    else if (req.status == 404 && opts.errorCallback) {
                        opts.errorCallback(new Error("404"));
                    }
                    else {
                        try {

                            UDS.ActionExecutor.ProcessSoapError(req.responseXML, opts.errorCallback);
                        }
                        catch (e) { }
                    }
                }
            };
        }

        req.send(opts.requestXml);

        if (!opts.async) {
            if (req.status == 200) {
                return this.ProcessSoapResponse(req.responseXML, opts.successCallback);
            }
            else if(req.status == 500 && req.responseXML != null) {
                return this.ProcessSoapError(req.responseXML, opts.errorCallback);
            }
            else
            {
                var error = new Error(req.statusText || req.status);
                error.status = req.status;
                return error;
            }
        }
    },

    ProcessSoapResponse: function (responseXml, successCallback) {
        this._setSelectionNamespaces(responseXml);
        var objectNodes = this.ObjectifyNodes(this._selectNodes(responseXml, "//a:Results/a:KeyValuePairOfstringanyType"));
        if (successCallback) {
            successCallback(objectNodes);
        }
        return objectNodes;
    },

    ProcessSoapError: function (responseXml, errorCallback) {
        this._setSelectionNamespaces(responseXml);
        var error = new Error(this._getNodeText(this._selectSingleNode(responseXml, "//s:Fault/faultstring")));
        if (errorCallback) {
            error['ResponseXML'] = this.XmlToString(responseXml);
            errorCallback(error);
        }
        return error;
    },

    ObjectifyNodes: function (nodes) {
        var result = {};

        for (var i = 0; i < nodes.length; i++) {
            var fieldName = this._getNodeText(nodes[i].firstChild);
            var fieldValue = nodes[i].childNodes[1];
            result[fieldName] = this.ObjectifyNode(fieldValue);
        }

        return result;
    },

    ObjectifyNode: function (node) {
        if (node.attributes != null) {
            if (node.attributes.getNamedItem("i:nil") != null && node.attributes.getNamedItem("i:nil").nodeValue == "true") {
                return null;
            }

            var nodeTypeName = node.attributes.getNamedItem("i:type") == null ? "c:string" : node.attributes.getNamedItem("i:type").nodeValue;

            switch (nodeTypeName) {
                case "a:EntityReference":
                    return {
                        id: this._getNodeText(node.childNodes[0]),
                        entityType: this._getNodeText(node.childNodes[1])
                    };
                case "a:QueryExpression":
                    return true;
                case "a:Entity":
                    return this.ObjectifyRecord(node);
                case "a:EntityCollection":
                    return this.ObjectifyCollection(node.firstChild);
                case "c:dateTime":
                    return this.ParseIsoDate(this._getNodeText(node));
                case "c:guid":
                    return this._getNodeText(node);
                case "c:string":
                    return this._getJsonObject(node);
                case "c:int":
                    return parseInt(this._getNodeText(node));
                case "a:OptionSetValue":
                    return parseInt(this._getNodeText(node.childNodes[0]));
                case "c:boolean":
                    return this._getNodeText(node.childNodes[0]) == "true";
                case "c:double":
                case "c:decimal":
                case "a:Money":
                    return parseFloat(this._getNodeText(node.childNodes[0]));
                default:
                    return null;
            }
        }

        return null;
    },

    ObjectifyCollection: function (node) {
        var result = [];

        for (var i = 0; i < node.childNodes.length; i++) {
            result.push(this.ObjectifyRecord(node.childNodes[i]));
        }

        return result;
    },

    ObjectifyRecord: function (node) {
        var result = {};

        result.logicalName = (node.childNodes[4].text !== undefined) ? node.childNodes[4].text : node.childNodes[4].textContent;
        result.id = (node.childNodes[3].text !== undefined) ? node.childNodes[3].text : node.childNodes[3].textContent;

        result.attributes = this.ObjectifyNodes(node.childNodes[0].childNodes);
        result.formattedValues = this.ObjectifyNodes(node.childNodes[2].childNodes);

        return result;
    },

    ParseIsoDate: function (s) {
        if (s == null || !s.match(this.isoDateExpression))
            return null;

        var dateParts = this.isoDateExpression.exec(s);
        return new Date(Date.UTC(parseInt(dateParts[1], 10),
            parseInt(dateParts[2], 10) - 1,
            parseInt(dateParts[3], 10),
            parseInt(dateParts[4], 10) - (dateParts[8] == "" || dateParts[8] == "Z" ? 0 : parseInt(dateParts[8])),
            parseInt(dateParts[5], 10),
            parseInt(dateParts[6], 10)));
    },

    GetServiceUrl: function () {
        return UDS.GetOrgServiceUrl();
    },

    _selectNodes: function (node, xPathExpression) {
        if (typeof (node.selectNodes) != "undefined") {
            return node.selectNodes(xPathExpression);
        }
        else {
            var output = [];
            var xPathResults = node.evaluate(xPathExpression, node, this._NSResolver, XPathResult.ANY_TYPE, null);
            var result = xPathResults.iterateNext();
            while (result) {
                output.push(result);
                result = xPathResults.iterateNext();
            }
            return output;
        }
    },

    _selectSingleNode: function (node, xpathExpr) {
        if (typeof (node.selectSingleNode) != "undefined") {
            return node.selectSingleNode(xpathExpr);
        }
        else {
            var xpe = new XPathEvaluator();
            var xPathNode = xpe.evaluate(xpathExpr, node, this._NSResolver, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
            return (xPathNode != null) ? xPathNode.singleNodeValue : null;
        }
    },

    _getNodeText: function (node) {
        if (typeof (node.text) != "undefined") {
            return node.text;
        }
        else {
            return node.textContent;
        }
    },

    _getJsonObject: function (node) {
        var text = this._getNodeText(node);
        if (text == null || text == "")
            return null;
        else
            try {
                return JSON.parse(text);
            }
            catch (e) {
                return text;
            }
    },

    _isNodeNull: function (node) {
        if (node == null) {
            return true;
        }

        if ((node.attributes.getNamedItem("i:nil") != null) && (node.attributes.getNamedItem("i:nil").value == "true")) {
            return true;
        }
        return false;
    },

    _getNodeName: function (node) {
        if (typeof (node.baseName) != "undefined") {
            return node.baseName;
        }
        else {
            return node.localName;
        }
    },

    _setSelectionNamespaces: function (doc) {
        try {
            var namespaces = [
            "xmlns:s='http://schemas.xmlsoap.org/soap/envelope/'",
            "xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts'",
            "xmlns:i='http://www.w3.org/2001/XMLSchema-instance'",
            "xmlns:b='http://schemas.datacontract.org/2004/07/System.Collections.Generic'",
            "xmlns:c='http://schemas.microsoft.com/xrm/2011/Metadata'"
            ];
            doc.setProperty("SelectionNamespaces", namespaces.join(" "));
        } catch (e) { }
    },

    _NSResolver: function (prefix) {
        var ns = {
            "s": "http://schemas.xmlsoap.org/soap/envelope/",
            "a": "http://schemas.microsoft.com/xrm/2011/Contracts",
            "i": "http://www.w3.org/2001/XMLSchema-instance",
            "b": "http://schemas.microsoft.com/crm/2011/Contracts",
            "c": "http://schemas.datacontract.org/2004/07/System.Collections.Generic"
        };
        return ns[prefix] || null;
    },

    XmlToString: function (xmlData) {

        var xmlString;
        //IE
        if (window.ActiveXObject) {
            xmlString = xmlData.xml;
        }
            // code for Mozilla, Firefox, Opera, etc.
        else {
            xmlString = (new XMLSerializer()).serializeToString(xmlData);
        }
        return xmlString;
    },


    isoDateExpression: /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.?(\d*)?(Z|[+-]\d{2}?(:\d{2})?)?$/
};

UDS.Ribbon = {
    InitGridEnableRule: function (gridControl) {
        if (!UDS.Ribbon.InitGridEnableRule.IsInitialized) {
            gridControl.add_onSelectionChange(function () {
                if (UDS.Ribbon.InitGridEnableRule.LastGridSelectedRowsCount == gridControl.get_selectedRecordCount()) {
                    try {
                        refreshRibbon();
                    }
                    catch (e) {
                        try {
                            window.parent.Xrm.Page.ui.refreshRibbon();
                        }
                        catch (e) { }
                    }
                }
                else {
                    UDS.Ribbon.InitGridEnableRule.LastGridSelectedRowsCount = gridControl.get_selectedRecordCount();
                }
            });
            UDS.Ribbon.InitGridEnableRule.IsInitialized = true;
            UDS.Ribbon.InitGridEnableRule.LastGridSelectedRowsCount = 0;
        }
    },

    OpenCreateFormInNewTabFromSubgrid: function (SelectedEntityTypeCode, PrimaryEntityTypeCode, FirstPrimaryItemId, PrimaryControl, SelectedControl, OpensFromParentEntityTypeCodes) {
        if (!OpensFromParentEntityTypeCodes || OpensFromParentEntityTypeCodes && OpensFromParentEntityTypeCodes.indexOf(PrimaryEntityTypeCode) > -1 ) {
            var win = UDS.Form.openFormObject(SelectedEntityTypeCode, PrimaryEntityTypeCode, FirstPrimaryItemId, "")

            if (win) {
                win._masterWindow = Window.self;
                var refreshSubGrid = function () { setTimeout(() => SelectedControl.refresh(), 1500); };
                win.Xrm.Page.data.entity.addOnSave(refreshSubGrid);
                win.focus();
            }
        }
        else {
            Mscrm.GridRibbonActions.addNewFromSubGridStandard(SelectedEntityTypeCode, PrimaryEntityTypeCode, FirstPrimaryItemId, PrimaryControl, SelectedControl);
        }
    },

    OpenCreateFormInNewTabFromSubgridWithAddExistingBydefault: function (SelectedEntityTypeCode, PrimaryEntityTypeCode, FirstPrimaryItemId, PrimaryControl, SelectedControl, OpensFromParentEntityTypeCodes) {
        if (!OpensFromParentEntityTypeCodes || OpensFromParentEntityTypeCodes && OpensFromParentEntityTypeCodes.indexOf(PrimaryEntityTypeCode) > -1) {
            var win = UDS.Form.openFormObject(SelectedEntityTypeCode, PrimaryEntityTypeCode, FirstPrimaryItemId, "")

            if (win) {
                win._masterWindow = Window.self;
                var refreshSubGrid = function () { setTimeout(() => SelectedControl.refresh(), 1500); };
                win.Xrm.Page.data.entity.addOnSave(refreshSubGrid);
                win.focus();
            }
        }
        else {
            Mscrm.GridRibbonActions.addExistingFromSubGridStandard(SelectedEntityTypeCode, SelectedControl);
        }
    },

    OpenCreateFormInNewTabFromSubgridWithAddAssociatedBydefault: function (SelectedEntityTypeCode, PrimaryEntityTypeCode, FirstPrimaryItemId, PrimaryControl, SelectedControl, OpensFromParentEntityTypeCodes) {
        if (!OpensFromParentEntityTypeCodes || OpensFromParentEntityTypeCodes && OpensFromParentEntityTypeCodes.indexOf(PrimaryEntityTypeCode) > -1) {
            var win = UDS.Form.openFormObject(SelectedEntityTypeCode, PrimaryEntityTypeCode, FirstPrimaryItemId, "")

            if (win) {
                win._masterWindow = Window.self;
                var refreshSubGrid = function () { setTimeout(() => SelectedControl.refresh(), 1500); };
                win.Xrm.Page.data.entity.addOnSave(refreshSubGrid);
                win.focus();
            }
        }
        else {
            Mscrm.GridRibbonActions.addExistingFromSubGridAssociated(SelectedEntityTypeCode, SelectedControl);
        }
    },

    OpenConnectionFromFormInNewTabFromSubgridWithAddNewRecordFromSubGridStandardBydefault: function (SelectedEntityTypeCode, PrimaryEntityTypeCode, FirstPrimaryItemId, PrimaryControl, SelectedControl, OpensFromParentEntityTypeCodes, connectToMe) {
        if (!OpensFromParentEntityTypeCodes || OpensFromParentEntityTypeCodes && OpensFromParentEntityTypeCodes.indexOf(PrimaryEntityTypeCode) > -1) {
            var win = UDS.Form.openConnectFormObj(SelectedEntityTypeCode, PrimaryEntityTypeCode, FirstPrimaryItemId, connectToMe)

            if (win) {
                win._masterWindow = Window.self;
                var refreshSubGrid = function () { setTimeout(() => SelectedControl.refresh(), 1500); };
                win.Xrm.Page.data.entity.addOnSave(refreshSubGrid);
                win.focus();
            }
        }
        else {
            Mscrm.RibbonActions.addConnectionFromForm(FirstPrimaryItemId, PrimaryEntityTypeCode, PrimaryControl, connectToMe);
        }
    }
};

UDS.SavedQuery = {
    Fetch: {
        FetchToXml: function (fetchObj) {
            var result = "";

            if (fetchObj) {
                var possibleAttributes = [
                    "version", "count", "page",
                    "paging-cookie", "utc-offset", "aggregate",
                    "distinct", "top", "mapping",
                    "min-active-row-version", "output-format", "returntotalrecordcount",
                    "no-lock"
                ];
                var tagBuilder = new UDS.SavedQuery.TagBuilder("fetch");
                tagBuilder.AddAttributesFromSource(possibleAttributes, fetchObj);
                result += tagBuilder.BuildStart();
                result += UDS.SavedQuery.ElementsToXml(fetchObj.entities, UDS.SavedQuery.Fetch.EntityToXml);
                result += tagBuilder.BuildEnd();
            }

            return result;
        },

        EntityToXml: function (entityObj) {
            var result = "";

            if (entityObj) {
                var possibleAttributes = [
                    "name"
                ];
                var tagBuilder = new UDS.SavedQuery.TagBuilder("entity");
                tagBuilder.AddAttributesFromSource(possibleAttributes, entityObj);
                result += tagBuilder.BuildStart();
                if (entityObj.allAttributes) {
                    var allAttributesTagBuilder = new UDS.SavedQuery.TagBuilder("all-attributes");
                    result += allAttributesTagBuilder.BuildSelfClosed();
                }
                else {
                    result += UDS.SavedQuery.ElementsToXml(entityObj.attributes, UDS.SavedQuery.Fetch.AttributeToXml);
                }
                result += UDS.SavedQuery.ElementsToXml(entityObj.orders, UDS.SavedQuery.Fetch.OrderToXml);
                result += UDS.SavedQuery.ElementsToXml(entityObj.filters, UDS.SavedQuery.Fetch.FilterToXml);
                result += UDS.SavedQuery.ElementsToXml(entityObj.linkEntities, UDS.SavedQuery.Fetch.LinkEntityToXml);
                result += tagBuilder.BuildEnd();
            }

            return result;
        },

        AttributeToXml: function (attributeObj) {
            var result = "";

            if (attributeObj) {
                var possibleAttributes = [
                    "name", "addedby", "alias",
                    "aggregate", "groupby", "dategrouping",
                    "usertimezone"
                ];
                var tagBuilder = new UDS.SavedQuery.TagBuilder("attribute");
                tagBuilder.AddAttributesFromSource(possibleAttributes, attributeObj);

                result = tagBuilder.BuildSelfClosed();
            }

            return result;
        },

        OrderToXml: function (orderObj) {
            var result = "";

            if (orderObj) {
                orderObj.descending = orderObj.descending == undefined ? false : orderObj.descending;
                var possibleAttributes = [
                    "attribute", "alias", "descending"
                ];
                var tagBuilder = new UDS.SavedQuery.TagBuilder("order");
                tagBuilder.AddAttributesFromSource(possibleAttributes, orderObj);

                result = tagBuilder.BuildSelfClosed();
            }

            return result;
        },

        FilterToXml: function (filterObj) {
            var result = "";

            if (filterObj) {
                filterObj.type = filterObj.type || "and";
                var possibleAttributes = [
                    "isquickfindfields", "type"
                ];
                var tagBuilder = new UDS.SavedQuery.TagBuilder("filter");
                tagBuilder.AddAttributesFromSource(possibleAttributes, filterObj);
                result += tagBuilder.BuildStart();
                result += UDS.SavedQuery.ElementsToXml(filterObj.conditions, UDS.SavedQuery.Fetch.ConditionToXml, 500);
                result += UDS.SavedQuery.ElementsToXml(filterObj.filters, UDS.SavedQuery.Fetch.FilterToXml);
                result += tagBuilder.BuildEnd();
            }

            return result;
        },

        LinkEntityToXml: function (linkEntityObj) {
            var result = "";

            if (linkEntityObj) {
                var possibleAttributes = [
                    "name", "to", "from",
                    "alias", "link-type", "visible",
                    "intersect"
                ];
                var tagBuilder = new UDS.SavedQuery.TagBuilder("link-entity");
                tagBuilder.AddAttributesFromSource(possibleAttributes, linkEntityObj);
                result += tagBuilder.BuildStart();
                if (linkEntityObj.allAttributes) {
                    var allAttributesTagBuilder = new UDS.SavedQuery.TagBuilder("all-attributes");
                    result += allAttributesTagBuilder.BuildSelfClosed();
                }
                else {
                    result += UDS.SavedQuery.ElementsToXml(linkEntityObj.attributes, UDS.SavedQuery.Fetch.AttributeToXml);
                }
                result += UDS.SavedQuery.ElementsToXml(linkEntityObj.orders, UDS.SavedQuery.Fetch.OrderToXml);
                result += UDS.SavedQuery.ElementsToXml(linkEntityObj.filters, UDS.SavedQuery.Fetch.FilterToXml);
                result += UDS.SavedQuery.ElementsToXml(linkEntityObj.linkEntities, UDS.SavedQuery.Fetch.LinkEntityToXml);
                result += tagBuilder.BuildEnd();
            }

            return result;
        },

        ConditionToXml: function (conditionObj) {
            var result = "";

            if (conditionObj) {
                var possibleAttributes = [
                    "column", "attribute", "operator",
                    "value", "aggregate", "alias",
                    "uiname", "uitype", "uihidden"
                ];
                var tagBuilder = new UDS.SavedQuery.TagBuilder("condition");
                tagBuilder.AddAttributesFromSource(possibleAttributes, conditionObj);

                result = tagBuilder.BuildSelfClosed();
            }

            return result;
        },
    },

    Layout: {
        GridToXml: function (gridObj) {
            var result = "";

            if (gridObj) {
                gridObj.select = 1;
                var possibleAttributes = [
                    "icon", "jump", "name",
                    "object", "preview", "select"
                ];
                var tagBuilder = new UDS.SavedQuery.TagBuilder("grid");
                tagBuilder.AddAttributesFromSource(possibleAttributes, gridObj);
                result += tagBuilder.BuildStart();
                result += UDS.SavedQuery.ElementsToXml(gridObj.rows, UDS.SavedQuery.Layout.RowToXml);
                result += tagBuilder.BuildEnd();
            }

            return result;
        },

        RowToXml: function (rowObj) {
            var result = "";

            if (rowObj) {
                var possibleAttributes = [
                    "id", "multiobjectidfield", "name"
                ];
                var tagBuilder = new UDS.SavedQuery.TagBuilder("row");
                tagBuilder.AddAttributesFromSource(possibleAttributes, rowObj);
                result += tagBuilder.BuildStart();
                result += UDS.SavedQuery.ElementsToXml(rowObj.cells, UDS.SavedQuery.Layout.CellToXml);
                result += tagBuilder.BuildEnd();
            }

            return result;
        },

        CellToXml: function (cellObj) {
            var result = "";

            if (cellObj) {
                var possibleAttributes = [
                    "addedby", "disableSorting", "ishidden",
                    "name", "width"
                ];
                var tagBuilder = new UDS.SavedQuery.TagBuilder("cell");
                tagBuilder.AddAttributesFromSource(possibleAttributes, cellObj);

                result = tagBuilder.BuildSelfClosed();
            }

            return result;
        }
    },

    TagBuilder: function (name) {
        var self = this;

        var attributes = {};
        var tagName = name;

        self.AddAttribute = function (name, value) {
            if (name) {
                attributes[name] = value;
            }
        };

        self.AddAttributesFromSource = function (possibleAttributes, source) {
            if (possibleAttributes &&
                possibleAttributes.length > 0 &&
                source) {
                for (var i = 0; i < possibleAttributes.length; i++) {
                    if (source[possibleAttributes[i]] != undefined) {
                        attributes[possibleAttributes[i]] = source[possibleAttributes[i]];
                    }
                }
            }
        };

        self.BuildStart = function () {
            return "<" + tagName + " " + GetAttributesString() + ">";
        };

        self.BuildEnd = function () {
            return "</" + tagName + ">";
        };

        self.BuildSelfClosed = function () {
            return "<" + tagName + " " + GetAttributesString() + " />";
        };

        var GetAttributesString = function () {
            var attributesPair = [];
            for (var attrName in attributes) {
                if (attributes.hasOwnProperty(attrName))
                    attributesPair.push(attrName + "='" + attributes[attrName] + "'");
            }

            return attributesPair.join(" ");
        };
    },

    ElementsToXml: function (elements, converter, maxCount) {
        var result = "";

        if (elements && elements.length > 0) {
            var elementsCount = elements.length;
            if (maxCount) {
                elementsCount = Math.min(elementsCount, maxCount);
            }
            for (var i = 0; i < elementsCount; i++) {
                result += converter(elements[i]);
            }
        }

        return result;
    }
}

UDS.Lookup = {
    FilterBuilder: function () {
        var self = this;

        var filterId, filterName, filterEntityName, filterFetchXml, filterLayoutXml, isFilterViewPickerDisabled = true, isSetFilterAsDefault = true;

        self.Id = function (id) {
            filterId = id;

            return builder;
        };

        self.Name = function (name) {
            filterName = name;

            return builder;
        };

        self.EntityName = function (name) {
            filterEntityName = name;

            return builder;
        };

        self.FetchXml = function (fetchXml) {
            filterFetchXml = fetchXml;

            return builder;
        };

        self.LayoutXml = function (layoutXml) {
            filterLayoutXml = layoutXml;

            return builder;
        };

        self.DisableViewPicker = function (isViewPickerDisabled) {
            isFilterViewPickerDisabled = isViewPickerDisabled;

            return builder;
        };

        self.Default = function (isDefault) {
            isSetFilterAsDefault = isDefault;

            return builder;
        };

        self.ApplyTo = function (lookupName) {
            var lookupControl = Xrm.Page.getControl(lookupName);
            var lookupElement = lookupControl.get_editControlBehavior().get_element();
            if (lookupControl) {
                var isViewPickerDisabled = lookupElement && lookupElement.getAttribute("disableViewPicker");
                if (isViewPickerDisabled) {
                    lookupElement.setAttribute("disableViewPicker", 0);
                }
                lookupControl.addCustomView(filterId, filterEntityName, filterName, filterFetchXml, filterLayoutXml, isSetFilterAsDefault);
                if (isSetFilterAsDefault) {
                    lookupControl.setDefaultView(filterId);
                }
                if (lookupElement && isFilterViewPickerDisabled) {
                    lookupElement.setAttribute("disableViewPicker", 1);
                }
            }
        };

        var builder = {
            Id: self.Id,
            Name: self.Name,
            EntityName: self.EntityName,
            IsDefault: self.IsDefault,
            FetchXml: self.FetchXml,
            LayoutXml: self.LayoutXml,
            DisableViewPicker: self.DisableViewPicker,
            Default: self.Default,
            ApplyTo: self.ApplyTo
        };
    },

    FilterQueryBuilder: function () {
        var self = this;

        var queryAttributes, queryOrders = [], queryFilters, queryLinkEntities, entityName;

        self.EntityName = function (name) {
            entityName = name;

            return builder;
        }

        self.Attributes = function (attributes) {
            queryAttributes = attributes;

            return builder;
        };

        self.Order = function (attribute, descending) {
            queryOrders.push({ attribute: attribute, descending: descending });

            return builder;
        };

        self.Filters = function (filters) {
            queryFilters = filters;

            return builder;
        };

        self.LinkEntities = function (linkEntities) {
            queryLinkEntities = linkEntities;

            return builder;
        };

        self.ToXml = function () {
            var isAllAttributes = queryAttributes === true;
            var attributes;
            if (queryAttributes && queryAttributes.length > 0) {
                attributes = [];
                for (var i = 0; i < queryAttributes.length; i++) {
                    attributes.push({ name: queryAttributes[i] });
                }
            }

            var fetchObj = {
                version: "1.0",
                "output-format": "xml-platform",
                mapping: "logical",
                distinct: true,
                entities: [
                    {
                        name: entityName,
                        attributes: attributes,
                        allAttributes: isAllAttributes,
                        orders: queryOrders,
                        filters: queryFilters,
                        linkEntities: queryLinkEntities
                    }
                ]
            };

            return UDS.SavedQuery.Fetch.FetchToXml(fetchObj);
        };

        var builder = {
            Attributes: self.Attributes,
            Order: self.Order,
            Filters: self.Filters,
            LinkEntities: self.LinkEntities,
            ToXml: self.ToXml
        };
    },

    FilterLayoutBuilder: function () {
        var self = this;

        var objectTypeCode, jumpAttribute, idAttribute, showIcon = 0, cells = [];

        self.ObjectTypeCode = function (otc) {
            objectTypeCode = otc;

            return builder;
        }

        self.Jump = function (jump) {
            jumpAttribute = jump;

            return builder;
        };

        self.Cell = function (attribute, width) {
            cells.push({ name: attribute, width: width });

            return builder;
        };

        self.Id = function (id) {
            idAttribute = id;

            return builder;
        };

        self.ShowIcon = function (icon) {
            showIcon = icon;

            return builder;
        };

        self.ToXml = function () {
            var gridObj = {
                name: "resultset",
                object: objectTypeCode,
                jump: jumpAttribute,
                select: 1,
                icon: showIcon,
                preview: 1,
                rows: [
                    {
                        name: "result",
                        id: idAttribute,
                        cells: cells
                    }
                ]
            };

            return UDS.SavedQuery.Layout.GridToXml(gridObj);
        };

        var builder = {
            ObjectTypeCode: self.ObjectTypeCode,
            Jump: self.Jump,
            Cell: self.Cell,
            Id: self.Id,
            ShowIcon: self.ShowIcon,
            ToXml: self.ToXml
        };
    },
    //set up through params passed to function, comma separated lookup attributes that needs to be opened in new tab
    //ex 'uds_buildingid','uds_cooperativeid'
    OpenRecordInNewTab: function () {
        const OnChangeLookUp = function (attributeName) {
            return () => {
                var LookUpattr = Xrm.Page.getAttribute(attributeName);
                var entityReference = LookUpattr && LookUpattr.getValue();
                if (entityReference && entityReference[0]) {
                    var url = UDS.GetServerUrl();

                    url = url + '/main.aspx?pagetype=entityrecord&etn=' + entityReference[0].typename + '&id=' + entityReference[0].id;

                    const openInNewTab = function (ev) { window.open(url, ''); };
                    var controls = LookUpattr.controls.get();
                    for (var i = 0; i < controls.length; i++) {
                        var valel = controls[i].get_valueElement();

                        if (valel && valel.length > 0) {
                            var linkel = valel.find('span.ms-crm-Lookup-Item');
                            if (linkel && linkel.length > 0) {
                                linkel[0].onclick = openInNewTab;
                            }
                        }
                    }
                }
            }
        }

        for (var i = 0; i < arguments.length; i++) {
            var attr = Xrm.Page.getAttribute(arguments[i]);
            attr.addOnChange(OnChangeLookUp(arguments[i]));
            OnChangeLookUp(arguments[i])();
        }     
    }
};

UDS.createMainUrl = function (editUrl, type, parameters) {
    var $v_0 = Mscrm.CrmUri.create("/main.aspx");
    $v_0.get_query()["etc"] = type.toString();
    $v_0.get_query()["pagetype"] = "entityrecord";
    if (!IsNull(editUrl)) {
        var $v_1 = editUrl.get_queryString();
        if (!isNullOrEmptyString($v_1))
            $v_0.get_query()["extraqs"] = $v_1;
        if ("rskey" in editUrl.get_query() && !isNullOrEmptyString(editUrl.get_query()["rskey"]))
            $v_0.get_query()["rskey"] = editUrl.get_query()["rskey"]
    }
    if (!IsNull(parameters)) {
        if (!IsNull(parameters["rof"]))
            $v_0.get_query()["rof"] = parameters["rof"];
        if (!IsNull(parameters["pagemode"]))
            $v_0.get_query()["pagemode"] = parameters["pagemode"];
        if (!IsNull(parameters["newWindow"]))
            $v_0.get_query()["newWindow"] = parameters["newWindow"];
        if (!IsNull(parameters["histKey"]))
            $v_0.get_query()["histKey"] = parameters["histKey"]
    }
    return $v_0
};

UDS.Form = {
    Type: {
        Create: 1,
        Update: 2,
        ReadOnly: 3,
        Disabled: 4,
        QuickCreate: 5,
        BulkEdit: 6
    },
    openFormObject: function (type, createFromType, createFromId, additionalAttributes) {
        var queryString = "?_CreateFromType=" + CrmEncodeDecode.CrmUrlEncode(createFromType) + "&_CreateFromId=" + CrmEncodeDecode.CrmUrlEncode(createFromId) + additionalAttributes;

        return UDS.Form.openFrmObject(queryString, type);      
    },
    openFrmObject: function (queryString, type) {
        var $v_1 = getWindowInformation(type)
            , $v_2 = $v_1["windowInfo"]
            , url = $v_2.Url

        if (!IsNull(url)) {
            if (queryString.length > 0 && queryString.charAt(0) === "?" || queryString.charAt(0) === "&")
                queryString = queryString.substr(1);
            urlPrefix = "";
            var $v_8 = url.toString();
            url = Mscrm.CrmUri.create(urlPrefix + $v_8 + ($v_8.indexOf("?") === -1 ? "?" : "&") + queryString);

            if (Mscrm.EtcUtil.isUserDefinedEntityObjectTypeCode(type))
                url.get_query()["etc"] = type;

            parameters = {};
            parameters["newWindow"] = true;
            parameters["histKey"] = Math.floor(Math.random() * 1e9).toString();
            url = UDS.createMainUrl(url, type, parameters)

            var features = "";//"location=yes,menubar=yes,status=no,toolbar=yes";

            return window.open(url.toString(), new Date().getTime(), features, false);
        }
        return false;
    },

    openConnectFormObj: function (type, objectTypeCode, objectId, connectToMe)
    {
        var queryString = String.format("pId={0}&pType={1}", CrmEncodeDecode.CrmNameValueEncode(objectId), CrmEncodeDecode.CrmNameValueEncode(objectTypeCode.toString()));
        if (connectToMe)
            queryString = String.format("{0}&connectToMe=true", $v_0);
        if (objectTypeCode === Mscrm.EntityTypeCode.PriceLevel)
            queryString = String.format("{0}&connectFromPricelevel=true", $v_0);

        return UDS.Form.openFrmObject(queryString, type);
    },
    // UNSUPPORTED
    AttachSubGridRefreshEvent: function (subGridName, refreshHandler, retryCount, currentRetry) {
        if (refreshHandler) {
            if (retryCount == null) {
                retryCount = 3;
            }
            if (currentRetry == null) {
                currentRetry = 1;
            }
            var grid = document.getElementById(subGridName);
            if (grid) {
                grid.control.add_onRefresh(refreshHandler);
            }
            else {
                if (currentRetry < retryCount) {
                    setTimeout(UDS.Form.AttachSubGridRefreshEvent, 1000, subGridName, refreshHandler, retryCount, currentRetry + 1);
                }
            }
        }
    },

    // UNSUPPORTED
    SetBpfVisibility: function (isVisible) {
        /// <summary>
        /// Changes visibility of Business Process Flow.
        /// </summary>
        /// <param name="isVisible" type="Boolean" mayBeNull="false" optional="false" >
        /// Visibility boolean flag.
        /// </param>
        if (isVisible) {
            document.getElementById('header_process_d').style.display = "block";
        }
        else {
            document.getElementById('header_process_d').style.display = "none";
        }
    },

    // UNSUPPORTED
    DisableBpfNavigation: function () {
        /// <summary>
        /// Hides navigation buttons on Business Process Flow.
        /// </summary>
        var actionsContainer = document.getElementById('processActionsContainer');
        if (actionsContainer) {
            var stubDiv = document.createElement('div');
            stubDiv.style.height = actionsContainer.offsetHeight + 'px';
            stubDiv.style.width = actionsContainer.offsetWidth + 'px';
            stubDiv.style.background = '#376400';
            actionsContainer.clearChilds();
            actionsContainer.appendChild(stubDiv);
        }
    },

    Refresh: function (save) {
        /// <summary>
        /// Refreshes form and optionally saves data.
        /// </summary>
        /// <param name="save" type="Boolean" mayBeNull="false" optional="false" >
        /// Save boolean flag.
        /// </param>
        Xrm.Page.data.refresh(save);
    },

    DisableAllFields: function () {
        this.SetDisableAllFields(true);
    },

    EnableAllFields: function () {
        this.SetDisableAllFields(false);
    },

    SetDisableAllFields: function (value) {
        Xrm.Page.ui.controls.forEach(function (control, index) {
            if (control.setDisabled) {
                control.setDisabled(value);
            }
        });
    },

    ClearFormNotifications: function () {
        for (var i = 0, j = arguments.length; i < j; i++) {
            Xrm.Page.ui.clearFormNotification(arguments[i]);
        }
    },

    SaveFieldsDisableState: function () {
        arguments.callee.FieldsDisableState = [];
        Xrm.Page.ui.controls.forEach(function (control, index) {
            if (control.getDisabled && control.setDisabled) {
                UDS.Form.SaveFieldsDisableState.FieldsDisableState.push({ control: control, isDisabled: control.getDisabled() });
            }
        });
    },

    RestoreFieldsDisableState: function () {
        if (this.SaveFieldsDisableState.FieldsDisableState) {
            for (var i = 0, len = this.SaveFieldsDisableState.FieldsDisableState.length; i < len; i++) {
                this.SaveFieldsDisableState.FieldsDisableState[i].control.setDisabled(this.SaveFieldsDisableState.FieldsDisableState[i].isDisabled);
            }
        }
    },

    GetOptionSetLabel: function (optionSetFieldName, optionSetValue) {
        var result = null;
        var optionSetAttribute = Xrm.Page.getAttribute(optionSetFieldName);
        if (optionSetAttribute && optionSetAttribute.getOptions) {
            var optionSetOptions = optionSetAttribute.getOptions();
            for (var i = 0; i < optionSetOptions.length; i++) {
                if (optionSetOptions[i].value == optionSetValue) {
                    result = optionSetOptions[i].text;
                    break;
                }
            }
        }

        return result;
    },

    GetByName: function (formName) {
        var resultForms = Xrm.Page.ui.formSelector.items.get(
            function (item, index) {
                return item.getLabel() == formName;
            });
        if (resultForms.length > 0) {
            return resultForms[0];
        }
        else {
            return null;
        }
    },

    ProhibitCreateWithAlert: function (alertText) {
        var formType = Xrm.Page.ui.getFormType();
        if (formType == this.Type.Create) {
            alert(alertText);
            Xrm.Page.ui.close();
            return;
        }
    },

    OpenQuickCreate: function (parentTypeCode, parentId, gridControl, refreshGrid, childEntityName) {
        // UNSUPPORT
        window.LOCID_SAVE_GLOBAL_QUICKCREATE = "Save";
        window.LOCID_CANCEL_GLOBAL_QUICKCREATE = "Cancel";
        window.LOCID_CLOSE_GLOBAL_QUICKCREATE = "Close";

        var emd = UDS.GetEntityMetadata(childEntityName);
        var $$t_A = gridControl;
        Mscrm.GlobalQuickCreate.GlobalQuickCreateBehavior.launchGlobalQuickCreate(
            new Mscrm.GlobalQuickCreate.GridControlGlobalQuickCreateCallbacks(
                String.format("{0}_gridcontrol_quickcreate", gridControl.get_id()),
                gridControl.get_element().style.zIndex + 990,
                !refreshGrid ? null : $$t_A.$$d_refresh || ($$t_A.$$d_refresh = Function.createDelegate($$t_A, $$t_A.refresh))
            ),
            emd.DisplayName,
            emd.ObjectTypeCode,
            null,
            parentId,
            parentTypeCode)
    },

    SetAttributeSubmitMode: function (attributeLogicalName, submitMode) {
        /// <summary>
        /// Changes submit mode of the attribute.
        /// </summary>
        /// <param name="attributeLogicalName" type="String" mayBeNull="false" optional="false" >
        /// The logical name of an attribute.
        /// </param>
        /// <param name="submitMode" type="String" mayBeNull="false" optional="false" >
        /// Submit mode. Allowed values: never, dirty, always.
        /// </param>
        if ((typeof attributeLogicalName != "string") || (attributeLogicalName.length < 4)) {
            throw new Error("UDS.Form.SetAttributeSubmitMode attributeLogicalName parameter must be a string at least 4 characters long.");
        }
        var allowedModes = ["never", "dirty", "always"];
        if ((typeof submitMode != "string") || !allowedModes.contains(submitMode)) {
            throw new Error("UDS.Form.SetAttributeSubmitMode submitMode parameter must be a string and contain one of the allowed values: never, dirty, always.");
        }
        var attribute = Xrm.Page.getAttribute(attributeLogicalName);
        if (attribute) {
            attribute.setSubmitMode(submitMode);
        }
    },

    SetAttributeRequiredLevel: function (attributeLogicalName, requiredLevel) {
        /// <summary>
        /// Changes required level of the attribute.
        /// </summary>
        /// <param name="attributeLogicalName" type="String" mayBeNull="false" optional="false" >
        /// The logical name of an attribute.
        /// </param>
        /// <param name="requiredLevel" type="String" mayBeNull="false" optional="false" >
        /// Requirement level. Allowed values: none, recommended, required.
        /// </param>
        if ((typeof attributeLogicalName != "string") || (attributeLogicalName.length < 4)) {
            throw new Error("UDS.Form.SetAttributeRequiredLevel attributeLogicalName parameter must be a string at least 4 characters long.");
        }
        var allowedLevels = ["none", "recommended", "required"];
        if ((typeof requiredLevel != "string") || !allowedLevels.contains(requiredLevel)) {
            throw new Error("UDS.Form.SetAttributeRequiredLevel requiredLevel parameter must be a string and contain one of the allowed values: none, recommended, required.");
        }
        var attribute = Xrm.Page.getAttribute(attributeLogicalName);
        if (attribute) {
            attribute.setRequiredLevel(requiredLevel);
        }
    },

    SetBpfControlVisibility: function (attributeLogicalName, isVisible) {
        /// <summary>
        /// Changes visibility of a control in BPF area.
        /// </summary>
        /// <param name="attributeLogicalName" type="String" mayBeNull="false" optional="false" >
        /// The logical name of an attribute.
        /// </param>
        /// <param name="isVisible" type="Boolean" mayBeNull="false" optional="false" >
        /// Visibility boolean flag.
        /// </param>
        if ((typeof attributeLogicalName != "string") || (attributeLogicalName.length < 4)) {
            throw new Error("UDS.Form.SetBpfControlVisibility attributeLogicalName parameter must be a string at least 4 characters long.");
        }

        var control = Xrm.Page.getControl("header_process_" + attributeLogicalName);
        if (control) {
            control.setVisible(isVisible);
        }
    },

    SetBpfControlDisabled: function (attributeLogicalName, isDisabled) {
        /// <summary>
        /// Changes enable\disable state of a control in BPF area.
        /// </summary>
        /// <param name="attributeLogicalName" type="String" mayBeNull="false" optional="false" >
        /// The logical name of an attribute.
        /// </param>
        /// <param name="isDisabled" type="Boolean" mayBeNull="false" optional="false" >
        /// Enable\Disable boolean flag.
        /// </param>
        if ((typeof attributeLogicalName != "string") || (attributeLogicalName.length < 4)) {
            throw new Error("UDS.Form.SetBpfControlDisabled attributeLogicalName parameter must be a string at least 4 characters long.");
        }

        var control = Xrm.Page.getControl("header_process_" + attributeLogicalName);
        if (control) {
            control.setDisabled(isDisabled);
        }
    },

    SetAttributeControlsVisibility: function (attributeLogicalName, isVisible) {
        /// <summary>
        /// Changes visibility of all controls for the attribute.
        /// </summary>
        /// <param name="attributeLogicalName" type="String" mayBeNull="false" optional="false" >
        /// The logical name of an attribute.
        /// </param>
        /// <param name="isVisible" type="Boolean" mayBeNull="false" optional="false" >
        /// Visibility boolean flag.
        /// </param>
        if ((typeof attributeLogicalName != "string") || (attributeLogicalName.length < 4)) {
            throw new Error("UDS.Form.SetAttributeControlsVisibility attributeLogicalName parameter must be a string at least 4 characters long.");
        }

        var attribute = Xrm.Page.getAttribute(attributeLogicalName);
        if (attribute) {
            attribute.controls.forEach(
                function (control, i) {
                    control.setVisible(isVisible);
                });
        }

        var control = Xrm.Page.getControl("header_" + attributeLogicalName);
        if (control) {
            control.setVisible(isVisible);
        }

        var control = Xrm.Page.getControl("header_process_" + attributeLogicalName);
        if (control) {
            control.setVisible(isVisible);
        }
    },

    SetAttributeControlsDisabled: function (attributeLogicalName, isDisabled) {
        /// <summary>
        /// Changes enable\disable state of all controls for the attribute.
        /// </summary>
        /// <param name="attributeLogicalName" type="String" mayBeNull="false" optional="false" >
        /// The logical name of an attribute.
        /// </param>
        /// <param name="isDisabled" type="Boolean" mayBeNull="false" optional="false" >
        /// Enable\Disable boolean flag.
        /// </param>
        if ((typeof attributeLogicalName != "string") || (attributeLogicalName.length < 4)) {
            throw new Error("UDS.Form.SetAttributeControlsEnabled attributeLogicalName parameter must be a string at least 4 characters long.");
        }

        var attribute = Xrm.Page.getAttribute(attributeLogicalName);
        if (attribute) {
            attribute.controls.forEach(
                function (control, i) {
                    control.setDisabled(isDisabled);
                });
        }

        var control = Xrm.Page.getControl("header_" + attributeLogicalName);
        if (control) {
            control.setDisabled(isDisabled);
        }

        var control = Xrm.Page.getControl("header_process_" + attributeLogicalName);
        if (control) {
            control.setDisabled(isDisabled);
        }
    },

    SetAllAttributesDisabled: function (isDisabled) {
        /// <summary>
        /// Changes enable\disable state of all controls for all attributes.
        /// </summary>
        /// <param name="isDisabled" type="Boolean" mayBeNull="false" optional="false" >
        /// Enable\Disable boolean flag.
        /// </param>
        Xrm.Page
            .getAttribute()
            .forEach(
                function (attribute) {
                    SetAttributeControlsDisabled(attribute.getName(), isDisabled);
                }
            );
    },

    RemoveOptionSetOption: function (optionSetAttributeLogicalName, optionValue) {
        /// <summary>
        /// Removes item with specified value from specified OptionSet.
        /// </summary>
        /// <param name="optionSetAttributeLogicalName" type="String" mayBeNull="false" optional="false" >
        /// The logical name of an OptionSet attribute.
        /// </param>
        /// <param name="optionValue" type="Number" mayBeNull="false" optional="false" >
        /// The value of an item of OptionSet to remove.
        /// </param>
        if ((typeof optionSetAttributeLogicalName != "string") || (optionSetAttributeLogicalName.length < 4)) {
            throw new Error("UDS.Form.RemoveOptionSetOption: optionSetAttributeLogicalName parameter must be a string at least 4 characters long.");
        }

        if ((typeof optionValue != "number") || (optionValue < 0)) {
            throw new Error("UDS.Form.RemoveOptionSetOption: optionValue parameter must be a number and >= 0.");
        }

        var attribute = Xrm.Page.getAttribute(optionSetAttributeLogicalName);
        if (attribute) {
            if (attribute.getAttributeType() != "optionset") {
                throw new Error("UDS.Form.RemoveOptionSetOption: attribute specified by optionSetAttributeLogicalName parameter must be an optionset.");
            }
            if (attribute.getValue() != optionValue) {
                attribute.controls.forEach(
                    function (control, i) {
                        control.removeOption(optionValue);
                    });

                var control = Xrm.Page.getControl("header_" + optionSetAttributeLogicalName);
                if (control) {
                    control.removeOption(optionValue);
                }

                var control = Xrm.Page.getControl("header_process_" + optionSetAttributeLogicalName);
                if (control) {
                    control.removeOption(optionValue);
                }
            }
        }
    }
};

UDS.Entity = {
    GetById: function (entityTypeName, entityId, attributes) {
        var query = new UDS.Query.QueryBuilder(entityTypeName)
                .Select(attributes)
                .Filter("and")
                .Condition(entityTypeName + "Id", "eq", entityId, "Guid");
        var entity = new UDS.Query.QueryExecutor(query).Retrieve();
        return entity;
    },

    GetByIds: function (entityTypeName, entityIds, attributes) {
        var query = new UDS.Query.QueryBuilder(entityTypeName)
                .Select(attributes)
                .Filter("or");
        for (var i = 0; i < entityIds.length; i++) {
            query = query.Condition(entityTypeName + "Id", "eq", entityIds[i], "Guid");
        }
        var entities = new UDS.Query.QueryExecutor(query).RetrieveMultiple();
        return entities;
    },

    CloneEntityFromForm: function (cloneFieldsList, primaryAttributeName, clonePrimaryAttributePrefix, clonePrimaryAttributeSuffix) {
        cloneFieldsList = cloneFieldsList.map(function (f) { return f.toLowerCase(); });
        var parameters = {};
        for (var i = 0; i < cloneFieldsList.length; i++) {
            var fieldAttribute = Xrm.Page.getAttribute(cloneFieldsList[i]);
            if (fieldAttribute != null && fieldAttribute.getValue() != null) {
                switch (fieldAttribute.getAttributeType()) {
                    case "lookup":
                        var lookup = fieldAttribute.getValue()[0];
                        parameters[cloneFieldsList[i]] = lookup.id;
                        parameters[cloneFieldsList[i] + "name"] = lookup.name;
                        break;
                    case "datetime":
                        parameters[cloneFieldsList[i]] = fieldAttribute.getValue().toQueryString();
                        break;
                    default:
                        if (cloneFieldsList[i] == primaryAttributeName) {
                            parameters[cloneFieldsList[i]] = clonePrimaryAttributePrefix + fieldAttribute.getValue() + clonePrimaryAttributeSuffix;
                        }
                        else {
                            parameters[cloneFieldsList[i]] = fieldAttribute.getValue();
                        }
                }
            }
        }
        Xrm.Utility.openEntityForm(Xrm.Page.data.entity.getEntityName(), null, parameters);
    },

    CloneEntityFromReference: function (entityTypeName, entityId, cloneFieldsList, primaryAttributeName, clonePrimaryAttributePrefix, clonePrimaryAttributeSuffix) {
        var entity = this.GetById(entityTypeName, entityId, cloneFieldsList);
        if (entity != null) {
            var parameters = {};
            for (var i = 0; i < cloneFieldsList.length; i++) {
                var attribute = entity[cloneFieldsList[i]];
                if (attribute != null) {
                    var paramAttribute = cloneFieldsList[i].toLowerCase();
                    switch (typeof attribute) {
                        case "object":
                            switch (attribute.__metadata.type) {
                                case "Microsoft.Crm.Sdk.Data.Services.EntityReference":
                                    if (attribute.Id != null) {
                                        parameters[paramAttribute] = attribute.Id;
                                        parameters[paramAttribute + "name"] = attribute.Name;
                                    }
                                    break;
                                case "Microsoft.Crm.Sdk.Data.Services.Money":
                                case "Microsoft.Crm.Sdk.Data.Services.OptionSetValue":
                                    if (attribute.Value != null) {
                                        parameters[paramAttribute] = attribute.Value;
                                    }
                                    break;
                            }
                            break;
                        default:
                            var datePattern = /Date\(\d+\)/;
                            if (datePattern.test(attribute)) {
                                var dateValue = new Date(parseInt(attribute.replace("/Date(", "").replace(")/", ""), 10));
                                parameters[paramAttribute] = dateValue.toQueryString();
                            }
                            else {
                                if (paramAttribute == primaryAttributeName) {
                                    parameters[paramAttribute] = clonePrimaryAttributePrefix + attribute + clonePrimaryAttributeSuffix;
                                }
                                else {
                                    parameters[paramAttribute] = attribute;
                                }
                            }
                    }
                }
            }
            Xrm.Utility.openEntityForm(entityTypeName, null, parameters);
        }
    }
};

UDS.Cookie = UDS.Cookie || {};

UDS.Cookie.SetCookie = function (cname, cvalue, exhours) {
    var d = new Date();
    d.setTime(d.getTime() + (exhours * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};

UDS.Cookie.GetCookie = function (cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};

UDS.Cookie.RemoveCookie = function (cname) {
    var d = new Date();
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=;" + expires + ";path=/";
};