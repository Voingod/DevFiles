﻿/// <reference path="uds_tools.js" />

var IP = IP || {};
IP.Contract = IP.Contract || {};
IP.Contract.Form = IP.Contract.Form || {};
IP.Contract.Data = IP.Contract.Data || {};
IP.Contract.Ribbon = IP.Contract.Ribbon || {};
IP.Contract.Localization = IP.Contract.Localization || {};
IP.Contract.Localization.Strings = IP.Contract.Localization.Strings || {};
IP.Contract.Localization.Languages = IP.Contract.Localization.Languages || {};

IP.Contract.FiscalYear = IP.Contract.FiscalYear || {};

IP.Contract.FiscalYear.DataTransferAsync = function (json, messageType, successCallback, errorCalback) {
    if (typeof json == "object") json = JSON.stringify(json);
    var requestName = 'uds_LoanFiscalYearAccept';

    var requestXML = "<s:Envelope xmlns:s=\"http://schemas.xmlsoap.org/soap/envelope/\">\
                            <s:Body>\
                              <Execute xmlns=\"http://schemas.microsoft.com/xrm/2011/Contracts/Services\" xmlns:i=\"http://www.w3.org/2001/XMLSchema-instance\">\
                                <request xmlns:a=\"http://schemas.microsoft.com/xrm/2011/Contracts\">\
                                  <a:Parameters xmlns:b=\"http://schemas.datacontract.org/2004/07/System.Collections.Generic\">\
                                    <a:KeyValuePairOfstringanyType>\
                                      <b:key>MessageType</b:key>\
                                      <b:value i:type='c:int' xmlns:c='http://www.w3.org/2001/XMLSchema'>" + messageType + "</b:value>\
                                    </a:KeyValuePairOfstringanyType>\
                                    <a:KeyValuePairOfstringanyType>\
                                      <b:key>JsonObject</b:key>\
                                      <b:value i:type='c:string' xmlns:c='http://www.w3.org/2001/XMLSchema'>" + json + "</b:value>\
                                    </a:KeyValuePairOfstringanyType>\
                                  </a:Parameters>\
                                  <a:RequestId i:nil=\"true\" />\
                                  <a:RequestName>" + requestName + "</a:RequestName>\
                                </request>\
                              </Execute>\
                            </s:Body>\
                          </s:Envelope>";


    UDS.ActionExecutor.Execute(
        {
            requestXml: requestXML,
            async: true,
            successCallback: successCallback,
            errorCallback: errorCalback
        });
};


if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
                ;
        });
    };
}

IP.Contract.Localization.Languages["1035"] = "Finnish";
IP.Contract.Localization.Strings["1033"] = {
    MessageGegenarationBillingContractsGenerated: "Generation (update) of payer group billing contract is finished.",
    MessageGegenarationBillingContractsUpdated: "Last PG contracts update on {0} has been successfully completed.",
    MessageGegenarationBillingContractsError: "Last PG contracts update on {0} has completed with errors. Open PG contract update window to see lines with errors.",
    MessageGegenarationBillingContractsInQueue: "Generation of payer group billing contract is queued. Do not make any changes to the main contract until the process finish. You may continue working with the system.",
    MessageUpdateBillingContractsInQueue: "Update of payer group billing contract is queued. Do not make any changes to the main contract until the process finish. You may continue working with the system.",
    MessageUpdatePriceListContractsInQueue: "Update price list is queued. Do not make any changes to the main contract until the process finish. You may continue working with the system.",
    MessageGegenarationBillingContractsInProcessing: "Generation (update) of payer group billing contract is running. Do not make any changes to the main contract until the process finish. You may continue working with the system.",
    LiabilityTypeInsuranceOption: "Insurance",
    LiabilityTypeGuaranteeOption: "Guarantee",
    LiabilityTypeEncumberanceOption: "Encumberance",
    LiabilityTypeFullCoverageOption: "Insurance - Full coverage",
    LiabilityTypeVoluntaryWorkOption: "Insurance - Voluntary work",
    EnterValueBetween1951AndCurrentYear: "Enter value between 1951 and current year",
    MessageGenerationInvoicesCompleted: "Generation of invoices is finished!",
    MessageGenerationInvoicesInQueue: "Generation of invoices is queued. Do not make any changes to the contract until the process is finished.",
    MessageGenerationInvoicesInProcessing: "Generation of invoices is running. Do not make any changes to the invoice generation until the process finish. You may continue working with the system.",
    MessageErrorClosedPeriod: "Contract cannot be updated as it falls into closed fiscal year period.",
    MessageErrorCurrentMonthSet: "Recalculation Date needs to be within same month than current month is.",
    MessageErrorFiscalYearNotFound: "You tried to recalculate loan for Recalculation Date and there is no Fiscal year for that date. Add fiscal year and try again.",
    MessageErrorCalculationAlreadyRunning: "Calculation is already running. Try to recalculate later",
    Loading: 'Loading...',
    ConfirmDeleteInvoicesTableTitle: "Linked invoices will be deleted:<br /><br /><table style='width: 100%;padding-right: 20px;'><tr><th style='font-weight: bold;'>Invoice Number</th><th style='font-weight: bold;width:250px;'>Payers</th><th style='font-weight: bold;width:100px;'>Spaces</th><th style='font-weight: bold;'>Invoice Date</th><th style='font-weight: bold;text-align: right;'>Total Amount, €</th></tr>",
    ConfirmationWindowTitle: "Confirmation",
    TitleOkButton: "OK",
    TitleCancelButton: "CANCEL",
    TitleInvocesWarning: "Loan product is missing from some invoices or some invoices are missing for the calculated period. Monthly payments have been created based on contract lines.",
};

IP.Contract.Localization.Strings["1035"] = {
    MessageGegenarationBillingContractsGenerated: "Maksajaryhmän laskutussopimuksen luonti (päivitys) on valmis.",
    MessageGegenarationBillingContractsUpdated: "Viimeisin maksajaryhmän laskutussopimusten päivitys {0} onnistui.",
    MessageGegenarationBillingContractsError: "Viimeisimmässä maksajaryhmän laskutussopimusten päivityksessä havaittiin virheitä. Avaa sopimusten päivitysikkuna nähdäksesi virheelliset sopimusrivit.",
    MessageGegenarationBillingContractsInQueue: "Sopimusten luonti käynnissä - älä tee muutoksia sopimuksiin kunnes sopimusten luonti on valmis - voit jatkaa järjestelmän muuta käyttöä.",
    MessageUpdateBillingContractsInQueue: "Maksajaryhmän laskutussopimuksen päivitys on jonossa - älä tee muutoksia sopimuksiin kunnes sopimusten luonti on valmis - voit jatkaa järjestelmän muuta käyttöä.",
    MessageUpdatePriceListContractsInQueue: "Hintalistapäivitys on jonossa - älä tee muutoksia sopimuksiin kunnes sopimusten luonti on valmis - voit jatkaa järjestelmän muuta käyttöä.",
    MessageGegenarationBillingContractsInProcessing: "Maksajaryhmän laskutussopimuksen luonti (päivitys) on käynnissä - älä tee muutoksia sopimuksiin kunnes sopimusten luonti on valmis - voit jatkaa järjestelmän muuta käyttöä.",
    LiabilityTypeInsuranceOption: "Vakuutus",
    LiabilityTypeGuaranteeOption: "Vakuus",
    LiabilityTypeEncumberanceOption: "Rasite",
    LiabilityTypeFullCoverageOption: "Vakuutus - Kiinteistön täysarvovakuutus",
    LiabilityTypeVoluntaryWorkOption: "Vakuutus - Talkoovakuutus",
    EnterValueBetween1951AndCurrentYear: "Syötä arvo väliltä 1951-kuluva vuosi",
    MessageGenerationInvoicesCompleted: "Laskujen luonti on valmis!",
    MessageGenerationInvoicesInQueue: "Laskujen luonti käynnissä - älä tee muutoksia laskuihin kunnes luonti on valmis - voit jatkaa järjestelmän muuta käyttöä.",
    MessageGenerationInvoicesInProcessing: "Laskujen luonti käynnissä - älä tee muutoksia laskuihin kunnes luonti on valmis - voit jatkaa järjestelmän muuta käyttöä.",
    MessageErrorClosedPeriod: "Laskentaa ei voida päivittää kyseiselle päivälle, sillä se vaikuttaa suljettuun kauteen.",
    MessageErrorCurrentMonthSet: "Laske tähän päivään täytyy olla saman kuukauden aikana kuin kuluva kuukausi.",
    MessageErrorFiscalYearNotFound: "Yritit laskea lainaa päivälle, jolle ei löydy tilikautta. Lisää tilikausi ja yritä sen jälkeen uudestaan.",
    MessageErrorCalculationAlreadyRunning: "Laskenta on jo käynnissä. Yritä myöhemmin uudelleen.",
    Loading: 'Ladataan...',
    ConfirmDeleteInvoicesTableTitle: "Sopimusrivi, jota yrität poistaa on liitetty laskuun. Jos poistat sopimusrivin myös nämä laskut poistetaan:<br /><br /><table style='width: 100%;padding-right: 20px;'><tr><th style='font-weight: bold;'>Laskun numero</th><th style='font-weight: bold;width:250px;'>Maksajat</th><th style='font-weight: bold;width:100px;'>Tilat</th><th style='font-weight: bold;'>Lasku päivämäärä</th><th style='font-weight: bold;text-align: right;'>Kokonaissumma, €</th></tr>",
    ConfirmationWindowTitle: "Vahvistus",
    TitleOkButton: "OK",
    TitleCancelButton: "PERUUTA",
    TitleInvocesWarning: "Pääomavastike puuttuu joiltain laskuilta tai jotkin laskut puuttuvat laskentajaksolta. Kuukausittaiset rahoitusvastikkeet on luotu sopimusrivien pohjalta.",
};

IP.Contract.Localization.GetLocalizedString = function (key) {
    var userLcid = Xrm.Page.context.getUserLcid();

    return this.Strings[userLcid] ? this.Strings[userLcid][key] : this.Strings["1033"][key];
};


IP.Contract.SubGrids = {
    GetEventFiscalYearFilter: function (startDate, endDate) {

        var dates = this.GetDatesForFilter(startDate, endDate);
        var fyStartDate = dates.Start;
        //var fyEndDate = dates.End;

        var filter = "<filter type='and' >"
            + "        <condition attribute='uds_contractid' operator='eq' value='" + Xrm.Page.data.entity.getId() + "' />"
            + "        <condition attribute='uds_date' operator='ge' value='" + fyStartDate + "' />"
            // + "        <condition attribute='uds_date' operator='lt' value='" + fyEndDate + "' />"
            + "      </filter>";

        return filter;

    },

    GetInterestHistoryFiscalYearFilter: function (startDate, endDate) {

        var dates = this.GetDatesForFilter(startDate, endDate);
        var fyStartDate = dates.Start;
        /*
          //var fyEndDate = dates.End;
        var filter = "      <filter type='and' >"
            + "        <condition attribute='uds_loancontract' operator='eq' value='" + Xrm.Page.data.entity.getId() + "' />"
            + "        <filter type='or' >"
            + "          <filter type='and' >"
            + "            <condition attribute='uds_periodstartdate' operator='ge' value='" + fyStartDate + "' />"
            + "            <condition attribute='uds_periodstartdate' operator='lt' value='" + fyEndDate + "' />"
            + "          </filter>"
            + "          <filter type='and' >"
            + "            <condition attribute='uds_periodstartdate' operator='lt' value='" + fyEndDate + "' />"
            + "            <filter type='or' >"
            + "              <condition attribute='uds_periodenddate' operator='null' />"
            + "              <condition attribute='uds_periodenddate' operator='ge' value='" + fyStartDate + "' />"
            + "            </filter>"
            + "          </filter>"
            + "        </filter>"
            + "      </filter>";
            */
        var filter = "      <filter type='and' >"
            + "        <condition attribute='uds_loancontract' operator='eq' value='" + Xrm.Page.data.entity.getId() + "' />"
            + "        <filter type='or' >"
            + "            <condition attribute='uds_periodstartdate' operator='ge' value='" + fyStartDate + "' />"
            + "            <filter type='or' >"
            + "              <condition attribute='uds_periodenddate' operator='null' />"
            + "              <condition attribute='uds_periodenddate' operator='ge' value='" + fyStartDate + "' />"
            + "            </filter>"
            + "        </filter>"
            + "      </filter>";

        return filter;
    },

    GetLoanEventsCotractGridXml: function (startDate, endDate) {

        var fetchXml = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
            "  <entity name='uds_loan'>" +
            "    <attribute name='uds_contractlineid' />" +
            "    <attribute name='uds_interest' />" +
            "    <attribute name='uds_eventtypecode' />" +
            "    <attribute name='uds_amount' />" +
            "    <attribute name='uds_date' />" +
            "    <attribute name='uds_loanid' />" +
            "    <order attribute='uds_contractlineid' descending='false' />" +
            "    <filter type='and'>" +
            "      <condition attribute='uds_eventtypecode' operator='eq' value='100000005' />" +
            this.GetEventFiscalYearFilter(startDate, endDate) +
            "    </filter>" +
            "  </entity>" +
            "</fetch>";

        var gridXml =
        {
            FetchXml: fetchXml,
            // LayoutXml: layoutXml,
            //Callback: this.RemoveFiscalYearColumn
        };

        return gridXml;

    },

    GetOneTimeEventsGridXml: function (startDate, endDate) {

        var fetchXml = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
            "  <entity name='uds_loan'>" +
            "    <attribute name='uds_unitswithdebt' />" +
            "    <attribute name='uds_interest' />" +
            "    <attribute name='uds_eventtypecode' />" +
            "    <attribute name='uds_eventdescription' />" +
            "    <attribute name='uds_date' />" +
            "    <attribute name='uds_bankaccountid' />" +
            "    <attribute name='uds_amount' />" +
            "    <attribute name='uds_contractlineid' />" +
            "    <attribute name='uds_loanid' />" +
            "    <order attribute='uds_date' descending='false' />" +
            "    <filter type='and'>" +
            "      <condition attribute='statecode' operator='eq' value='0' />" +
            "      <condition attribute='uds_eventtypecode' operator='not-in'>" +
            "        <value>100000005</value>" +
            "        <value>100000011</value>" +
            "      </condition>" +
            this.GetEventFiscalYearFilter(startDate, endDate) +
            "    </filter>" +
            "  </entity>" +
            "</fetch>";

        var gridXml =
        {
            FetchXml: fetchXml,
            // LayoutXml: layoutXml,
            //Callback: this.RemoveFiscalYearColumn
        };

        return gridXml;

    },

    GetInterestHistoryGridXml: function (startDate, endDate) {

        var fetchXml = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>"
            + "  <entity name='uds_interestcalculation'>"
            + "    <attribute name='uds_periodstartdate' />"
            + "    <attribute name='uds_periodenddate' />"
            + "    <attribute name='uds_numberofdays' />"
            + "    <attribute name='uds_interestvalue' />"
            + "    <attribute name='uds_amount' />"
            + "    <attribute name='uds_adjustedinterestamount' />"
            + "    <attribute name='uds_interestcalculationid' />"
            + "    <order attribute='uds_periodstartdate' descending='false' />"
            + "    <filter type='and'>"
            + "      <condition attribute='statecode' operator='eq' value='0' />"
            + this.GetInterestHistoryFiscalYearFilter(startDate, endDate)
            + "    </filter>"
            + "  </entity>"
            + "</fetch>";

        var gridXml =
        {
            FetchXml: fetchXml,
            // LayoutXml: layoutXml
            //Callback: 
        };

        return gridXml;
    },

    RemoveFiscalYearColumn: function (gridId) {
        if (gridId.control) {
            var layoutXml = gridId.control.GetParameter("layoutXml");
            if (layoutXml) {
                layoutXml = layoutXml.replace(/<cell name="uds_fiscalyearid" width="\d+"\/>/, "");
                gridId.control.SetParameter("layoutXml", layoutXml);
            }

        }
    },

    SetFetchToSubgridControl: function (controlName, gridXml) {

        var gridId = document.getElementById(controlName);
        if (gridId == null || gridId.control == null || gridId.control.get_isRefreshing()) {
            var thisFunction = IP.Contract.SubGrids.SetFetchToSubgridControl;
            setTimeout(function () { thisFunction(controlName, gridXml) }, 500);
            return;
        }
        var subgrid = gridId.control;
        if (gridXml.Callback) gridXml.Callback(gridId);
        if (gridXml.FetchXml) subgrid.SetParameter("fetchXml", gridXml.FetchXml);
        if (gridXml.LayoutXml) subgrid.SetParameter("layoutXml", gridXml.LayoutXml);

        var refreshSubgrid = function (controlName) {
            var gridId = document.getElementById(controlName);
            if (gridId == null || gridId.refresh == null) {
                setTimeout(function () { refreshSubgrid(controlName) }, 100);
            }
            gridId.refresh();
        };

        if (subgrid.RefreshGridAndClearPaging) subgrid.RefreshGridAndClearPaging();
        else if (subgrid.refresh) subgrid.refresh();

        //if (subgrid.Refresh) subgrid.Refresh();
        //if (subgrid.refreshLiteSubGrid) subgrid.refreshLiteSubGrid();
        if (gridId.refresh) gridId.refresh();
        //else refreshSubgrid(controlName);        

    },

    GetDatesForFilter(startDate, endDate) {

        var fyStartDate = startDate.format("yyyy-MM-dd"); // year + "-01-01";
        var fyEndDate = endDate.format("yyyy-MM-dd"); //(year + 1) + "-01-01";

        var convertDate = function (strDate) {
            return new Date(parseInt(strDate.replace(/[^0-9]/g, "")));
        };

        if (IP.Contract.FiscalYear.FilterStartDate) {
            fyStartDate = convertDate(IP.Contract.FiscalYear.FilterStartDate).format("yyyy-MM-dd");
        }

        var dates =
        {
            Start: fyStartDate,
            End: fyEndDate
        }

        return dates;
    }
};


var dialog = null;

$(window).resize(function () {
    if (IP && IP.Contract)
        IP.Contract.setSizeForPopupWindow();
});

IP.Contract.TermsOfPaymentType = {
    NotPayableAtOnce: 100000000,
    PayableAtOnce: 100000001
};

IP.Contract.SourceDataType = {
    Spaces: 100000000,
    Shares: 100000001,
    Cooperatives: 100000002
};

IP.Contract.DateEndedType = {
    Open: false,
    Ended: true
};

IP.Contract.RoleTypeCode = {
    Seller: 100000000,
    Buyer: 100000001,
    Creditor: 100000002,
    Borrower: 100000003,
    Lessor: 100000004,
    Tenant: 100000005,
    LiabilityGiver: 100000006,
    LiabilityReceiver: 100000007,
    ContractIssuer: 100000008,
    ContractTaker: 100000009,
    Conveyor: 100000010,
    Receiver: 100000011
};

IP.Contract.SourceDataTypeCode = {
    Spaces: 100000000,
    Shares: 100000001,
    Cooperatives: 100000002
};

IP.Contract.PayerGroupContractsGenerationCode = {
    Queued: 100000000,
    UpdateQueued: 100000003,
    Processing: 100000001,
    Generated: 100000002,
    Error: 100000004,
    Updated: 100000005,
    UpdatePriceListQueued: 100000006
};

IP.Contract.TransferMessageType = {
    Create: 1,
    Update: 2,
    DeleteConnection: 3,
    DeleteContractLine: 4,
    UpdateMassEditLines: 5,
    DeleteMassEditLines: 6,
    GetTableForUpdateChildContracts: 7,
    UpdateChildContracts: 8,
    GetMainTableData: 9,
    GetMassEditTableData: 10,
    UpdateMassEditLine: 11,
    EditContractLinesByProduct: 12,
    DeleteContractLinesByProduct: 13,
    UpdateChildContractSaldo: 14,
    GetUpdatePGContractErrors: 15,
    GetMainContractErrors: 16,
    GetEditFormPayers: 17,
    DeleteConnectionByPayer: 18,
    GetErrors: 19,
    GetMassEditLinesData: 20,
    GetEditFormData: 21,
    GetMeterReading: 22,
    GetPriceItem: 23,
    GetPriceItemsChanges: 24,
    GetMassCreateData: 25,
    UpdateChildContractSaldoDate: 26,
    UpdateSettings: 27,
    GetContractConfiguration: 28,
    SaveContractConfiguration: 29,
    DeleteInvoices: 30,
    CheckIsFirstConsumptionLine: 31,
    SynchronizePayerGroupContracts: 32,
    CheckInvoicesForDelete: 33
};

IP.Contract.ContractTypeCode = {
    BillingContract: 752560000,
    LiabilityContract: 752560001,
    LoanContract: 752560002,
    MaintenanceContract: 752560003,
    RentContract: 752560004,
    SpaceOwnershipContract: 752560005,
    InsuranceContract: 752560006
};

IP.Contract.CalculationType = {
    New: 100000000,
    Transferred: 100000001
};

IP.Contract.RaiseTypeCode = {
    Percentage: 100000000,
    CostOfLivingIndex: 100000001,
    CostOfConstructionIndex: 100000002,
    FixedAmount: 100000003
};

IP.Contract.QVSellerType = {
    GeneralGrid: 1,
    RentGrid: 2,
    BillingGrid: 3
};

IP.Contract.ContractMessageType = {
    ActivateContractAndLines: 1
};

IP.Contract.PayerGroupContractsGenerationValue = null;

IP.Contract.Form = {
    ErrorModel: null,

    OnCreateForm: function () {
        Xrm.Page.getAttribute("expireson").setValue(new Date(2099, 11, 30));
        Xrm.Page.getAttribute("billingendon").setValue(new Date(2099, 11, 30));

        Xrm.Page.getControl("uds_groupby").setDisabled(false);
        Xrm.Page.getAttribute("uds_groupby").setSubmitMode("always");
    },

    InitializationContractConnectionQView: function () {
        if (UDS.SubGrid && Xrm.Page.getAttribute("uds_sellergroupid").getValue())
            UDS.SubGrid.Popup.InitContractConnection("PARTY_1_DETAILS_PARTY_1_DETAILS_uds_payergroup_PARTY_1");

        if (UDS.SubGrid && Xrm.Page.getAttribute("uds_payergroupid").getValue())
            UDS.SubGrid.Popup.InitContractConnection("PARTY_2_DETAILS_PARTY_2_DETAILS_uds_payergroup_PARTY_2");

        var contractType = Xrm.Page.getAttribute("uds_contracttypecode").getValue();

        if (contractType == IP.Contract.ContractTypeCode.RentContract) {
            this.SetSellerQVSection(IP.Contract.QVSellerType.RentGrid);
            UDS.SubGrid.Popup.InitContractConnection("PARTY_1_DETAILS_PARTY_1_DETAILS_uds_payergroup_party1_rent");
        }
        else if (contractType == IP.Contract.ContractTypeCode.BillingContract) {
            var parentContract = Xrm.Page.getAttribute("uds_primarycontractid").getValue();
            if (parentContract) {
                var pcRecord = UDS.Entity.GetById("Contract", parentContract[0].id, ["uds_contracttypecode"]);

                if (pcRecord.uds_contracttypecode && pcRecord.uds_contracttypecode.Value == IP.Contract.ContractTypeCode.RentContract) {
                    this.SetSellerQVSection(IP.Contract.QVSellerType.BillingGrid);
                    UDS.SubGrid.Popup.InitContractConnection("PARTY_1_DETAILS_PARTY_1_DETAILS_uds_payergroup_party1_billing");
                }

            }
        }
    },

    SetSellerQVSection: function (type) {
        var qvGeneralSection = document.getElementById("{c790bb84-ff48-4317-a210-6f1eba597b1c}");
        var qvRentSection = document.getElementById("{0a1ce3cb-be6b-a51e-0527-ebd411423866}");
        var qvBillingSection = document.getElementById("{95ea9063-d7dc-3dd5-3765-a76c1a4a70c7}");

        qvGeneralSection.style.display = type == IP.Contract.QVSellerType.GeneralGrid ? "" : "none";
        qvRentSection.style.display = type == IP.Contract.QVSellerType.RentGrid ? "" : "none";
        qvBillingSection.style.display = type == IP.Contract.QVSellerType.BillingGrid ? "" : "none";
    },
    OnChangePayerGroup: function () {
        this.InitializationContractConnectionQView();
    },
    OnChangeSellerGroup: function () {

        this.InitializationContractConnectionQView();
    },



    OnLoadForm: function () {
        var formType = Xrm.Page.ui.getFormType();

        this.InitializationContractConnectionQView();

        this.InitializationBillingContract();
        this.InitializationLiabilityContract();
        this.InitializationRentContract();
        this.InitializationMaintenanceContract();
        this.InitializationSpaceOwnershipContract();
        this.InitializationInsuranceContract();

        this.SetPatyValuesByContractType();
        this.InitializationDatesByEndedType();
        this.InitializationCooperativeLevelField();
        //this.SetContractTypeOnCreate(); set from parameters
        this.OwnershipContractSpaceCustomLookup();
    //    this.SetVisibleShareField();
        this.SetFiltersOnLoanLedgerAccountsFields();
        //  this.InitializationErrorDescriptionField();

        this.SetCooperativeLink();

        if (formType != 3 && formType != 4) {
            this.RemoveFilterFromPriceList.DEFAULT_FILTER_ID = Xrm.Page.getControl("uds_pricelistid").getDefaultView();
            this.SetPriceListFilter();
        }

        if (formType != 1) {
            IP.Contract.FilterContractLinesGrid();
        }

        if (formType == 1) {
            this.OnCreateForm();
        }

        if (Xrm.Page.getAttribute("uds_cooperativelevelcontract").getValue() != true)
            Xrm.Page.getControl("uds_spaceslist").setVisible(true);
        else
            Xrm.Page.getControl("uds_spaceslist").setVisible(false);

        IP.Contract.Form.InitializationGenerateBillingContractNotification();


        this.InitializationLoanContract(false);
        this.SetSubgridsFilters();
        this.InitializationSaldoFields();
    },

    SetCooperativeLink: function()
    {
        var contractType = Xrm.Page.getAttribute("uds_contracttypeid").getValue();
        
        if(contractType != null &&
            contractType[0].name != null &&
            contractType[0].name.toLowerCase() == "loan contract") {

            Xrm.Page.getControl("uds_party2name").setVisible(true);
            var targetElem = document.getElementById("uds_party2name");
            
            
            var cooperativeId = Xrm.Page.getAttribute("uds_party2nameids").getValue();
            if(!cooperativeId || cooperativeId.length < 36)
            {
                //TODO: Lainaaja fetch
                return;
            }
    
            if(cooperativeId.length > 38)
            {
    
                var sepIndex = Math.max(cooperativeId.indexOf(';'),cooperativeId.indexOf(','));
                cooperativeId = cooperativeId.substring(0,sepIndex);
            }
            var targetSpan = targetElem.getElementsByTagName("span")[0];
            if(!targetSpan) {
                setTimeout(this.SetCooperativeLink, 500);
                return;
            }
            
            var coopLink = document.createElement('a');
            coopLink.href = Xrm.Page.context.getClientUrl() + '/main.aspx?etn=account&id=' + cooperativeId + '&pagetype=entityrecord';
            coopLink.target = "_blank";
            coopLink.style.color = "#0072c6";
            
            coopLink.innerText = targetSpan.innerText;
            targetSpan.innerText = "";
            targetSpan.style.color = "#0072c6";
            targetSpan.appendChild(coopLink);
        }


    },

    SetSubgridsFilters: function (startDate, endDate) {

        var contractType = Xrm.Page.getAttribute("uds_contracttypeid").getValue();

        if (contractType != null &&
            contractType[0].name != null &&
            contractType[0].name.toLowerCase() == "loan contract") {


            if (!IP.Contract.FiscalYear.IsFilterDateRequestSent) {

                IP.Contract.FiscalYear.IsFilterDateRequestSent = true;
                var fyCallBack = function (data) {
                    if (data && data.OutJsonObject) {
                        IP.Contract.FiscalYear.FilterStartDate = data.OutJsonObject.StartDate;
                        IP.Contract.Form.SetSubgridsFilters();
                    }

                };

                var json =
                {
                    ContractId: Xrm.Page.data.entity.getId()
                };
                IP.Contract.FiscalYear.DataTransferAsync(json, 4, fyCallBack);
            }
            else {
                var calcFor = Xrm.Page.getAttribute("uds_lastcalculatedfor").getValue();
                if (!calcFor) return;
                var year = calcFor ? calcFor.getFullYear() : new Date().getFullYear();

                IP.Contract.SubGrids.SetFetchToSubgridControl("LOAN_EVENTS_CONTRACT", IP.Contract.SubGrids.GetLoanEventsCotractGridXml(new Date(year, 0, 1), new Date(year + 1, 0, 1)));
                IP.Contract.SubGrids.SetFetchToSubgridControl("Loan_Events", IP.Contract.SubGrids.GetOneTimeEventsGridXml(new Date(year, 0, 1), new Date(year + 1, 0, 1)));
                IP.Contract.SubGrids.SetFetchToSubgridControl("InterestHistory", IP.Contract.SubGrids.GetInterestHistoryGridXml(new Date(year, 0, 1), new Date(year + 1, 0, 1)));
            }

        }

    },

    OpenContractCreateForm: function () {
        var parameters = {};
        var contractTemplate = IP.Contract.GetFirstContractTemplate();
        if (contractTemplate != null) {
            parameters["contracttemplateid"] = contractTemplate.ContractTemplateId;
            parameters["contracttemplateidname"] = contractTemplate.Name;
        }
        else {
            alert("Contract template not found!")
        }

        Xrm.Utility.openEntityForm("contract", null, parameters);    
    },
    /////////////////////////
    OpenAssociatedView: function (selectedEntityTypeCode, selectedControl, parentEntityTypeCode) {
        Mscrm.GridRibbonActions.openAssociatedGridViewOnLiteGridStandard(selectedEntityTypeCode, selectedControl)
    },
    /////////////////////////
    OpenContractCreateFormByType: function (type) {
        var parameters = {};
        var contractTemplate = IP.Contract.GetFirstContractTemplate();
        var contractType = IP.Contract.GetContractTypeByName(type);

        if (contractTemplate != null) {
            parameters["contracttemplateid"] = contractTemplate.ContractTemplateId;
            parameters["contracttemplateidname"] = contractTemplate.Name;
        }
        else {
            alert("Contract template not found!")
        }

        if (contractType != null) {
            parameters["uds_contracttypeid"] = contractType.uds_contracttypeId;
            parameters["uds_contracttypeidname"] = type;

            if (contractType.uds_contracttypecode == null) {
                alert("uds_contracttypecode is empty for contract type " + type);
            }
            parameters["uds_contracttypecode"] = contractType.uds_contracttypecode.Value;
        }
        else {
            alert("Contract type " + type + " not found!");
        }

        if (type == "Rent Contract") {
            parameters["uds_groupby"] = false;
            parameters["uds_invoicingday"] = 1;
            parameters["uds_paymentduebynumber"] = 5;
            parameters["uds_invoicegenerationday"] = "20";
        }

        if (Xrm.Page && Xrm.Page.data && Xrm.Page.data.entity && Xrm.Page.data.entity.getEntityName().toLowerCase() == 'uds_space') {

            var queryString = "?" + $.param(parameters);
            UDS.Form.openFrmObject(queryString, "1010");
        }
        else {
            Xrm.Utility.openEntityForm("contract", null, parameters);
        }      
    },

    ActivateContract: function (contractId) {
        var json = {
            ContractId: contractId.replace('{', '').replace('}', '')
        };

        IP.Contract.Data.ExecuteContractDataTransferAction(IP.Contract.ContractMessageType.ActivateContractAndLines, JSON.stringify(json));

        window.location = window.location;
    },

    CreateInvoiceGeneration: function (contractId) {
        if (IP.Contract.Form.CheckContractErrors(contractId[0])) {
            IP.Contract.ExecuteCreateInvoiceGenerationAction();
        }
    },

    CheckContractErrors: function (contractId) {
        var json = {
            ContractId: contractId,
            LocaleCode: Xrm.Page.context.getUserLcid()
        };

        var data = IP.Contract.Data.ExecuteDataTransferAction(IP.Contract.TransferMessageType.GetMainContractErrors, JSON.stringify(json));
        IP.Contract.Form.ErrorModel = data;

        if (data != null && data.IsExistErrors) {
            this.OpenErrorViewForm(contractId, data);
            return false;
        }

        return true;
    },

    OpenAddContractLinesDialog: function (contractId) {
        var dialogWebResource = "$webresource:uds_/AddContractLines/AddContractLinesDialog.html";

        var sourceDataType = Xrm.Page.getAttribute("uds_sourcedatatypecode");
        if (sourceDataType != null && sourceDataType.getValue() == IP.Contract.SourceDataType.Cooperatives) {
            dialogWebResource = "$webresource:uds_/AddContractLines/ContractEditToolByCooperativeDialog.html";
        }

        function saveDialogValues(result) {
            Xrm.Page.ui.controls.get("Contract_lines").refresh();

            IP.Contract.Form.InitializationGenerateBillingContractNotification();
        }

        var docWidth = document.body.clientWidth;
        var docHeight = document.body.clientHeight + 60;

        var cooperativeId = IP.Contract.GetCooperativeIdByContractId(contractId);
        var contract = IP.Contract.GetContractByContractId(contractId);

        var isAllowEditBRC = IP.Contract.Data.IsAllowEditBRC(contract.uds_cooperativelevelcontract, contractId);
        var isExistChildContracts = IP.Contract.IsContainsChildContracts(contractId);

        var startDate = IP.Contract.GetDateFromString(contract.ActiveOn);
        var endDate = IP.Contract.GetDateFromString(contract.ExpiresOn);

        var dialog = new Mscrm.CrmDialog(Mscrm.CrmUri.create(dialogWebResource), {
            CooperativeId: cooperativeId,
            ContractId: contractId,
            StartDate: (startDate != null) ? startDate : new Date(),
            EndDate: (endDate != null) ? endDate : new Date(2099, 12, 31),
            ContractType: contract.uds_ContractTypeId.Name.toLowerCase(),
            IsEndDateType: contract.uds_enddatetype,
            IsAllowEditBRC: isAllowEditBRC,
            CalculationTypeCode: (contract.uds_calculationtypecode != null) ? contract.uds_calculationtypecode.Value : null,
            IsParentContract: contract.uds_cooperativelevelcontract,
            IsExistChildContracts: isExistChildContracts
        }, docWidth, docHeight, null);
        dialog.setCallbackReference(saveDialogValues);
        dialog.show();
    },

    OpenLoanOneTimeGenerationDialog: function (contractId) {
        var dialogWebResource = "$webresource:uds_/LoanOneTimeInvoices/LoanOneTimeInvoices.html";

        function saveDialogValues(result) {
            if (result.IsInvoiceGenerating) {
                Xrm.Utility.openEntityForm("contract", Xrm.Page.data.entity.getId());
            }
        }

        var docWidth = document.body.clientWidth;
        var docHeight = document.body.clientHeight + 60;

        var invoicesFetchXml = "";

        var dialog = new Mscrm.CrmDialog(Mscrm.CrmUri.create(dialogWebResource), {
            ContractId: contractId,
            InvoicesAssociatedViewParameters: {
                ParentEntityTypeCode: 1010,
                EntityTypeCode: 1090,
                FetchXml: invoicesFetchXml,
                PrimaryRecordName: Xrm.Page.getAttribute("title").getValue(),
                FormType: Xrm.Page.ui.formSelector.getCurrentItem().getLabel(),
                CreatedOn: Xrm.Page.getAttribute("createdon").getValue(),
                Statecode: Xrm.Page.getAttribute("statecode").getSelectedOption().text,
                Ownerid: Xrm.Page.getAttribute("ownerid").getValue()[0],
                PrimaryEntityName: "Contract",
                EntityLogicalName: "invoice",
                ViewName: "InvoicesOnContract",
                IsView: true,
                CreateButton: false
            }
        }, docWidth, docHeight, null);
        dialog.setCallbackReference(saveDialogValues);
        dialog.show();
    },

    OpenUpdateChildContractsDialog: function (contractId) {
        var dialogWebResource = "$webresource:uds_/UpdateChildContracts/UpdateChildContracts.html";

        function saveDialogValues(result) {
            window.location = window.location;
            Xrm.Page.ui.controls.get("Contract_lines").refresh();

            IP.Contract.Form.InitializationGenerateBillingContractNotification();
        }

        var contract = IP.Contract.GetContractByContractId(contractId);

        var docWidth = document.body.clientWidth;
        var docHeight = document.body.clientHeight + 60;

        if (IP.Contract.Form.CheckContractErrors(contractId[0])) {
            var dialog = new Mscrm.CrmDialog(Mscrm.CrmUri.create(dialogWebResource), {
                ContractId: contractId,
                ErrorModel: IP.Contract.Form.ErrorModel,
                IsActualInformation: true
            }, docWidth, docHeight, null);
            dialog.setCallbackReference(saveDialogValues);
            dialog.show();
        }
    },

    OpenUpdatePriceListsDialog: function (contractIds) {
        var dialogWebResource = "$webresource:uds_/UpdatePriceLists/UpdatePriceLists.html";

        var docWidth = document.body.clientWidth;
        var docHeight = document.body.clientHeight + 60;

        var dialog = new Mscrm.CrmDialog(Mscrm.CrmUri.create(dialogWebResource), {
            ContractIds: contractIds
        }, docWidth, docHeight, null);
        dialog.setCallbackReference(saveDialogValues);
        dialog.show();

        function saveDialogValues(result) { }
    },

    OpenErrorViewForm: function (contractId, errorModel) {
        function saveDialogValues(result) { }

        var docWidth = document.body.clientWidth;
        var docHeight = document.body.clientHeight + 60;
        var resName = "$webresource:uds_/AddContractLines/ErrorsView.html";

        var dialog = new Mscrm.CrmDialog(Mscrm.CrmUri.create(resName), {
            ContractId: contractId,
            ErrorModel: IP.Contract.Form.ErrorModel,
            IsActualInformation: true
        }, docWidth, docHeight, null);
        dialog.setCallbackReference(saveDialogValues);
        dialog.show();
    },

    OpenSOCForm: function (contractId) {
        function saveDialogValues(result) {
            window.location = window.location;
            Xrm.Page.ui.controls.get("Contract_lines").refresh();
        }

        var docWidth = document.body.clientWidth;
        var docHeight = document.body.clientHeight + 60;
        var resName = "$webresource:uds_/SOC/SpaceOwnershipContract.html";

        var dialog = new Mscrm.CrmDialog(Mscrm.CrmUri.create(resName), {
            ContractId: contractId,
            FormType: Xrm.Page.ui.getFormType()
        }, docWidth, docHeight, null);
        dialog.setCallbackReference(saveDialogValues);
        dialog.show();
    },

    OnChangeContractTypeField: function () {
        this.InitializationBillingContract();
        this.InitializationLiabilityContract();
        this.InitializationLoanContract(true);
        this.InitializationRentContract();
        this.InitializationMaintenanceContract();
        this.InitializationSpaceOwnershipContract();
        this.InitializationInsuranceContract();

        this.SetPriceListFilter();
        this.SetPatyValuesByContractType();
    },

    OnChangeSeller: function () {
        var priceLevelAttr = Xrm.Page.getAttribute("uds_pricelistid");
        var seller = Xrm.Page.getAttribute("customerid").getValue();
        var contractType = Xrm.Page.getAttribute("uds_contracttypeid").getValue();
        var contractTypeCode = Xrm.Page.getAttribute("uds_contracttypecode").getValue();

        if (contractType != null &&
            contractType[0].name.toLowerCase() != "loan contract") {
            priceLevelAttr.setValue(null);
            this.SetPriceListFilter();

            if (seller != null) {
                var defaultPriceLevel = IP.Contract.GetDefaulPriceBySeller(seller[0]);

                if (defaultPriceLevel != null) {
                    Xrm.Page.getAttribute("uds_pricelistid").setValue([{
                        id: defaultPriceLevel.PriceLevelId,
                        name: defaultPriceLevel.Name,
                        entityType: "PriceLevel"
                    }]);

                    if (contractType[0].name.toLowerCase() == "space ownership contract") {
                        Xrm.Page.data.entity.save();
                    }
                }
            }
        }

        if (contractType != null && contractTypeCode == IP.Contract.ContractTypeCode.SpaceOwnershipContract) {
            this.OwnershipContractSpaceCustomLookup(seller);
            //IP.Contract.SetOwnerConnection(seller);
        }
    },

    OnChangeOrganization: function () {
        this.OnChangeParty2('uds_organizationid');
    },

    OnChangePerson: function () {
        this.OnChangeParty2('uds_personid');
    },

    OnChangeParty2: function (field) {
        var contractType = Xrm.Page.getAttribute("uds_contracttypeid").getValue();
        var party2 = Xrm.Page.getAttribute(field).getValue();

        if (contractType != null &&
            contractType[0].name.toLowerCase() == "loan contract") {
            Xrm.Page.getAttribute("uds_pricelistid").setValue(null);
            this.SetPriceListFilter();

            if (party2 != null) {
                var defaultPriceLevel = IP.Contract.GetDefaulPriceBySeller(party2[0]);

                if (defaultPriceLevel != null) {
                    Xrm.Page.getAttribute("uds_pricelistid").setValue([{
                        id: defaultPriceLevel.PriceLevelId,
                        name: defaultPriceLevel.Name,
                        entityType: "PriceLevel"
                    }]);
                }
            }
        }
    },

    OnChangeCusromerSelector: function () {
        Xrm.Page.getAttribute("uds_personid").setValue(null);
        Xrm.Page.getAttribute("uds_organizationid").setValue(null);

        var contractType = Xrm.Page.getAttribute("uds_contracttypeid").getValue();
        if (contractType != null &&
            contractType[0].name.toLowerCase() == "loan contract") {
            Xrm.Page.getAttribute("uds_pricelistid").setValue(null);
            this.SetPriceListFilter();
        }
    },

    OnChangeStartDateField: function () {
        this.CalculateDurationField();
        this.OwnershipContractSpaceCustomLookup();
    },

    OnChangeEndDateField: function () {
        this.CalculateDurationField();
    },
    //IP.Contract.Form.OnChangeRecalculationDate
    OnChangeRecalculationDate: function () {
        Xrm.Page.data.save();
    },

    OnChangeEndDateTypeField: function () {
        this.InitializationDatesByEndedType();

        var expiresOnAttr = Xrm.Page.getAttribute("expireson");
        var billingEndOnAttr = Xrm.Page.getAttribute("billingendon");
        var dateEndedTypeAttr = Xrm.Page.getAttribute("uds_enddatetype");

        if (dateEndedTypeAttr.getValue() == IP.Contract.DateEndedType.Open) {
            expiresOnAttr.setValue(new Date(2099, 11, 31));
            billingEndOnAttr.setValue(new Date(2099, 11, 31));
        }
        else {
            expiresOnAttr.setValue(null);
            billingEndOnAttr.setValue(null);
        }

        this.CalculateDurationField();
    },

    OnChangeRaiseTypeField: function () {
        var raiseTypeCode = Xrm.Page.getAttribute("uds_raisetype");
        if (raiseTypeCode != null && raiseTypeCode.getValue() != null) {
            if (raiseTypeCode.getValue() == IP.Contract.RaiseTypeCode.Percentage || raiseTypeCode.getValue() == IP.Contract.RaiseTypeCode.FixedAmount) {
                Xrm.Page.getControl("uds_value").setVisible(true);
                Xrm.Page.getControl("uds_basevaluemonth").setVisible(false);
                Xrm.Page.getControl("uds_basevalueyear").setVisible(false);
            }
            else {
                Xrm.Page.getControl("uds_value").setVisible(false);
                Xrm.Page.getControl("uds_basevaluemonth").setVisible(true);
                Xrm.Page.getControl("uds_basevalueyear").setVisible(true);
            }
        }
        else {
            Xrm.Page.getControl("uds_value").setVisible(false);
            Xrm.Page.getControl("uds_basevaluemonth").setVisible(false);
            Xrm.Page.getControl("uds_basevalueyear").setVisible(false);
        }
    },

    OnChangeBaseValueYearField: function () {
        var baseValueYear = Xrm.Page.getAttribute("uds_basevalueyear");
        if (baseValueYear != null && baseValueYear.getValue() != null && baseValueYear.getValue() != '') {
            if (parseInt(baseValueYear.getValue()) >= 1951 && parseInt(baseValueYear.getValue()) <= new Date().getFullYear()) {
                Xrm.Page.getControl("uds_basevalueyear").clearNotification();
            }
            else {
                Xrm.Page.getControl("uds_basevalueyear").setNotification(IP.Contract.Localization.GetLocalizedString("EnterValueBetween1951AndCurrentYear"));
            }
        }
    },

    OnChangeContractTypeOptionSet: function () {
        var contractTypeCodeValue = Xrm.Page.getAttribute("uds_contracttypecode").getValue();
        if (contractTypeCodeValue == null)
            return;

        //Change value of hided lookup field
        var contractType = IP.Contract.GetContractTypeByTypeCode(contractTypeCodeValue);
        if (contractType != null) {
            Xrm.Page.getAttribute("uds_contracttypeid").setValue([{
                id: contractType.uds_contracttypeId,
                name: contractType.uds_name,
                entityType: "uds_contracttype"
            }]);

            Xrm.Page.getAttribute("uds_contracttypeid").fireOnChange();
        }
    },

    OnChangeCooperativeField: function () {
        //Set uds_spaceid custom lookup
        this.OwnershipContractSpaceCustomLookup(); //SpaceOwnershipContract filtering uds_spaceid field by sellerId or cooperativeId
        IP.Contract.SetPriceListByCooperative();

        Xrm.Page.getAttribute("uds_spaceid").setValue(null);
    },

    OnChangeSpaceField: function () {
        var space = Xrm.Page.getAttribute("uds_spaceid").getValue();
        if (space == null)
            return;

        IP.Contract.SetSellerBySpace(space[0]);
    },

    OnChangeCalculationType: function () {
        this.SetCreditApproved();
    },

    OnChangeCreditStatingBalance: function () {
        this.SetCreditApproved();
    },

    OnChangeInitialSaldoField: function() {
        this.InitializationSaldoFields();
    },
    
    OnChangeInitialSaldoDateField: function() {
        this.InitializationSaldoFields();
    },

    InitializationSaldoFields: function () {
        var initialSaldoAttr = Xrm.Page.getAttribute('uds_initialsaldo');
        var initialSaldoDateAttr = Xrm.Page.getAttribute('uds_initialsaldodate');
        var contractTypeAttr = Xrm.Page.getAttribute('uds_contracttypecode');
        
        if (contractTypeAttr.getValue() === IP.Contract.ContractTypeCode.BillingContract) {
            if (initialSaldoAttr.getValue() != null ||
                initialSaldoDateAttr.getValue() != null) {
                initialSaldoAttr.setRequiredLevel("required");
                initialSaldoDateAttr.setRequiredLevel("required");
            }
            else {
                initialSaldoAttr.setRequiredLevel("none");
                initialSaldoDateAttr.setRequiredLevel("none");
            }
        }
    },

    CalculateDurationField: function () {
        Xrm.Page.getAttribute("uds_duration").setSubmitMode("always");

        var activeOnAttr = Xrm.Page.getAttribute("activeon");
        var expiresOnAttr = Xrm.Page.getAttribute("expireson");
        var durationAttr = Xrm.Page.getAttribute("uds_duration");
        var dateEndedTypeAttr = Xrm.Page.getAttribute("uds_enddatetype");

        durationAttr.setValue(0);

        if (dateEndedTypeAttr.getValue() == IP.Contract.DateEndedType.Open) {
            if (activeOnAttr.getValue() != null) {
                var dateNow = Date.parse(new Date());
                var endDate = Date.parse(activeOnAttr.getValue());

                if (dateNow > endDate) {
                    durationAttr.setValue((dateNow - endDate) / (1000 * 60 * 60 * 24) + 1);
                }
            }
        }
        else { // Ended Date Type
            if (activeOnAttr.getValue() != null && expiresOnAttr.getValue() != null) {
                var endDate = Date.parse(expiresOnAttr.getValue());
                var dateStart = Date.parse(activeOnAttr.getValue());

                durationAttr.setValue((endDate - dateStart) / (1000 * 60 * 60 * 24) + 1);
            }
        }
    },

    InitializationErrorDescriptionField: function () {
        var contractsGenerationCode = Xrm.Page.getAttribute("uds_payergroupcontractsgenerationcode").getValue();

        if (contractsGenerationCode == IP.Contract.PayerGroupContractsGenerationCode.Error) {
            Xrm.Page.getControl("uds_errordescription").setVisible(true);
        }
    },

    InitializationCooperativeLevelField: function () {
        var formType = Xrm.Page.ui.getFormType();
        if (formType == 1) {
            UDS.Form.SetAttributeControlsDisabled("uds_cooperativelevelcontract", false);
            UDS.Form.SetAttributeSubmitMode("uds_cooperativelevelcontract", "always");
        }
    },

    InitializationDatesByEndedType: function () {
        var dateEndedTypeAttr = Xrm.Page.getAttribute("uds_enddatetype");

        if (dateEndedTypeAttr.getValue() == IP.Contract.DateEndedType.Open) {
            Xrm.Page.getControl("expireson").setVisible(false);
            Xrm.Page.getControl("billingendon").setVisible(false);
            Xrm.Page.getAttribute("expireson").setRequiredLevel("none");
        }
        else {
            Xrm.Page.getControl("expireson").setVisible(true);
            Xrm.Page.getControl("billingendon").setVisible(true);
            Xrm.Page.getAttribute("expireson").setRequiredLevel("required");
        }
    },

    InitializationSpaceOwnershipContract: function () {
        var contractType = Xrm.Page.getAttribute("uds_contracttypeid").getValue();

        if (contractType != null && contractType[0].name != null &&
            contractType[0].name.toLowerCase() == "space ownership contract") {
            this.SetVisibleTab("tab_11", true);
            this.SetVisibleTabSection("tab_4", "tab_4_section_3", true);
            this.SetFieldsVisible("uds_spaceid", true);
            this.SetFieldsVisible("uds_cooperativeid", true);
            this.SetFieldRequired("uds_pricelistid", "required");
            this.SetFieldsVisible("cancelon", true);
            this.SetFieldsVisible("uds_contractsigningdate", true);
            this.SetFieldsVisible("uds_contractterminationperiod", true);

            var contracts = new Array();

            // Create form
            if (Xrm.Page.ui.getFormType() == 1) {
                Xrm.Page.getAttribute("activeon").setValue(new Date());
                this.SetFieldRequired("uds_pricelistid", "none");
                Xrm.Page.getAttribute("uds_enddatetype").setValue(IP.Contract.DateEndedType.Open);
                this.OnChangeEndDateTypeField();
            } else {
                var contractId = Xrm.Page.data.entity.getId().replace('{', '').replace('}', '');

                contracts.push(contractId);

                this.OpenSOCForm(contracts);
                return;
            }

            //contracts.push('00000000-0000-0000-0000-000000000000');

            //Set uds_spaceid custom lookup
            this.OwnershipContractSpaceCustomLookup(); //SpaceOwnershipContract filtering uds_spaceid field by sellerId or cooperativeId
        } else {
            this.SetVisibleTab("tab_11", false);
            this.SetFieldsVisible("uds_spaceid", false);
            this.SetFieldsVisible("uds_cooperativeid", false);
        }
    },

    InitializationLiabilityContract: function () {
        var contractType = Xrm.Page.getAttribute("uds_contracttypeid").getValue();

        if (contractType != null && contractType[0].name != null &&
            contractType[0].name.toLowerCase() == "liability contract") {
            this.SetFieldsVisible("uds_liabilitycontractstatuscode", true);
            this.SetFieldsVisible("uds_liabilitytypecode", true);
            this.SetFieldsVisible("uds_primarycontractid", false);
            this.SetFieldRequired("uds_pricelistid", "none");

            IP.Contract.Data.SetLiabilityTypeByContract("Liability");

            IP.Contract.SetContractLineGridForLiabilityContract();

            this.SetFieldsVisible("cancelon", true);
            this.SetFieldsVisible("uds_contractsigningdate", true);
            this.SetFieldsVisible("uds_contractterminationperiod", true);
        }
        else {
            this.SetFieldsVisible("uds_liabilitycontractstatuscode", false);
            this.SetFieldsVisible("uds_liabilitytypecode", false);
            this.SetFieldsVisible("uds_primarycontractid", true);
        }
    },

    InitializationInsuranceContract: function () {
        var contractType = Xrm.Page.getAttribute("uds_contracttypeid").getValue();

        if (contractType != null && contractType[0].name != null &&
            contractType[0].name.toLowerCase() == "insurance contract") {
            this.SetFieldsVisible("uds_liabilitycontractstatuscode", true);
            this.SetFieldsVisible("uds_liabilitytypecode", true);
            this.SetFieldsVisible("uds_primarycontractid", false);
            this.SetFieldRequired("uds_pricelistid", "none");

            IP.Contract.Data.SetLiabilityTypeByContract("Insurance");

            IP.Contract.SetContractLineGridForLiabilityContract();

            this.SetFieldsVisible("uds_contractterminationperiod", true);
            this.SetFieldsVisible("cancelon", true);
            this.SetFieldsVisible("uds_contractsigningdate", true);
        } else {
            if (contractType != null && contractType[0].name.toLowerCase() != "liability contract") {
                this.SetFieldsVisible("uds_liabilitytypecode", false);
                this.SetFieldsVisible("uds_liabilitycontractstatuscode", false);
                this.SetFieldsVisible("uds_primarycontractid", true);
            }
        }
    },

    InitializationBillingContract: function () {
        var contractType = Xrm.Page.getAttribute("uds_contracttypeid").getValue();

        if (contractType != null && contractType[0].name != null &&
            contractType[0].name.toLowerCase() == "billing contract") {
            //        Xrm.Page.ui.tabs.get('general').sections.get('RENTER').setLabel('SELLER');
            //       Xrm.Page.ui.tabs.get('general').sections.get('TENANT').setLabel('ORGANIZATION');

            this.SetVisibleTab("tab_7", true);
            this.SetVisibleTab("tab_13", true);
            this.SetVisibleTabSection("tab_4", "tab_4_section_3", true);
            this.SetFieldRequired("uds_invoicingday", "required");
            this.SetFieldRequired("uds_paymentduebynumber", "required");
            this.SetFieldRequired("uds_invoicegenerationday", "required");
            this.SetFieldRequired("uds_pricelistid", "required");
            this.SetFieldsVisible("cancelon", false);
            this.SetFieldsVisible("uds_contractsigningdate", false);
            this.SetFieldsVisible("uds_duration", false);


            if (Xrm.Page.getAttribute("uds_cooperativelevelcontract").getValue()) {
                this.SetVisibleTab("BILLING_CONTRACTS", true);
                this.SetFieldsVisible("uds_initialsaldo", false);
                this.SetFieldsVisible("uds_initialsaldodate", false);
                //this.SetVisibleTabSection("tab_14", "tab_14_section_1", true);

                this.SetVisibleTabSection('tab_13', 'MAIN_CONTRACT_GROUP_INVOICES_SECTION', true);

                Xrm.Page.getControl("uds_automaticinvoicegeneration").setVisible(true);
            }
            else {
                Xrm.Page.getControl("uds_ordererreference").setVisible(true);

                this.SetFieldsVisible("uds_initialsaldo", true);
                this.SetFieldsVisible("uds_initialsaldodate", true);

                this.SetVisibleTabSection('tab_13', 'CONTRACT_GROUP_INVOICES_SECTION', true);
            }

            IP.Contract.SetBRCChacngingEnabled();
            IP.Contract.SetInvoiceGenerationsSubgridFilter();
            IP.Contract.SetInvoiceSubgridFilter();
            //IP.Contract.SetDeliveryListSubgridFilter();
        } else {
            this.SetVisibleTab("tab_7", false);
            this.SetVisibleTab("tab_13", false);
            this.SetVisibleTab("BILLING_CONTRACTS", false);
            this.SetVisibleTabSection("tab_14", "tab_14_section_1", false);
            this.SetFieldsVisible("uds_initialsaldo", false);
            this.SetFieldRequired("uds_invoicingday", "none");
            this.SetFieldRequired("uds_paymentduebynumber", "none");
            this.SetFieldRequired("uds_invoicegenerationday", "none");
            this.SetFieldRequired("uds_pricelistid", "none");
        }
    },

    InitializationLoanContract: function (IsChangeType) {
        var contractType = Xrm.Page.getAttribute("uds_contracttypeid").getValue();
        var termsOfPaymentTypeAttr = Xrm.Page.getAttribute("uds_termsofpaymenttypecode");

        if (contractType != null && contractType[0].name != null &&
            contractType[0].name.toLowerCase() == "loan contract") {
            //Xrm.Page.getControl("uds_billingcontractcheckdate").setVisible(true);  //
            // Xrm.Page.getControl("uds_billingcontractcheckdateearliestdate").setVisible(true);
            this.SetVisibleTab("tab_8", true);
            this.SetVisibleTabSection("tab_4", "tab_4_section_3", true);
            this.SetVisibleTabSection("general", "calculation_section", true);
            this.SetFieldsVisible("uds_bankcontractnumber", true);
            this.SetFieldsVisible("uds_termsofpaymenttypecode", true);
            this.SetFieldsVisible("uds_paymenttype", true);
            this.SetFieldsVisible("uds_typeofloancode", true);
            this.SetFieldsVisible("uds_billingcontractindex", true);
            this.SetFieldsVisible("uds_interestindexvalue", true);
            this.SetFieldsVisible("uds_marginvalue", true);
            this.SetFieldsVisible("uds_interestratevaluecalc", true);
            this.SetFieldsVisible("uds_indexcheckdatenext", true);
            this.SetFieldsVisible("uds_lastcalculateddate", true);
            this.SetFieldsVisible("uds_interestcalculationformulacode", true);
            this.SetFieldsVisible("uds_descriptionincooperativereport", true);
            this.SetFieldsVisible("uds_interestallocationdaycode", true);
            this.SetFieldsVisible("uds_bankcharges", true);
            this.SetFieldRequired("uds_pricelistid", "none");
            this.SetFieldsVisible("cancelon", true);
            this.SetFieldsVisible("uds_contractsigningdate", true);

            if (termsOfPaymentTypeAttr.getValue() == null && IsChangeType) {
                termsOfPaymentTypeAttr.setValue(IP.Contract.TermsOfPaymentType.PayableAtOnce);
            }

            if (Xrm.Page.getAttribute("uds_recalculatecontract").getValue()) {
                IP.Contract.Ribbon.RecalculatingLoanWarning();
                IP.Contract.WaitingLoanCalculation(Xrm.Page.data.entity.getId());
            }

            IP.Contract.Form.SetVisibleTabSection("tab_13", "INVOICES_GRID", true);
            IP.Contract.Form.SetVisibleTabSection("tab_13", "ONE_TIME_INVOICING_SECTION", true);


            this.SetCreditApproved();

            IP.Contract.Form.InitializationGenerateLOTIInvoicesNotification();
        }
        else {
            termsOfPaymentTypeAttr.setValue(null);

            this.SetVisibleTab("tab_8", false);
            this.SetFieldsVisible("uds_bankcontractnumber", false);
            this.SetFieldsVisible("uds_termsofpaymenttypecode", false);
            this.SetFieldsVisible("uds_paymenttype", false);
            this.SetFieldsVisible("uds_typeofloancode", false);
            this.SetFieldsVisible("uds_billingcontractindex", false);
            this.SetFieldsVisible("uds_interestindexvalue", false);
            this.SetFieldsVisible("uds_marginvalue", false);
            this.SetFieldsVisible("uds_interestratevaluecalc", false);
            this.SetFieldsVisible("uds_indexcheckdatenext", false);
            this.SetFieldsVisible("uds_lastcalculateddate", false);
            this.SetFieldsVisible("uds_interestcalculationformulacode", false);
            this.SetFieldsVisible("uds_descriptionincooperativereport", false);
            this.SetFieldsVisible("uds_interestallocationdaycode", false);
        }
    },

    InitializationRentContract: function () {

        var contractType = Xrm.Page.getAttribute("uds_contracttypeid").getValue();

        if (contractType != null && contractType[0].name != null &&
            contractType[0].name.toLowerCase() == "rent contract") {
            this.SetVisibleTab("tab_7", true);

            if (Xrm.Page.getAttribute("uds_cooperativelevelcontract").getValue()) {
                Xrm.Page.getControl("uds_automaticinvoicegeneration").setVisible(true);
            }
            
            this.SetVisibleTabSection("general", "CONTRACT VALUE", true);
            this.SetVisibleTabSection("tab_7", "general_section_12", true);
            this.SetVisibleTabSection("tab_4", "tab_4_section_3", true);
            this.SetFieldsVisible("uds_contractenddateearliest", true);
            this.SetFieldsVisible("uds_contracttemplateid", true);
            this.SetFieldsVisible("uds_contractcheckdatecode", true);
            this.SetFieldsVisible("uds_rightofpossession", true);
            this.SetFieldsVisible("uds_billingcontractcheckdateearliestdate", true);
            this.SetFieldsVisible("uds_indexname", true);
            this.SetFieldsVisible("cancelon", true);
            this.SetFieldsVisible("uds_contractsigningdate", true);
            this.SetFieldRequired("uds_pricelistid", "none");
            this.SetVisibleTab("tab_13", true);
            this.SetFieldsVisible("uds_contractterminationperiod", true);

            if (Xrm.Page.getAttribute("uds_cooperativelevelcontract").getValue()) {
                this.SetVisibleTab("BILLING_CONTRACTS", true);
                this.SetVisibleTabSection('tab_13', 'MAIN_CONTRACT_GROUP_INVOICES_SECTION', true);
            }

            IP.Contract.SetLiabilityContractSubgridFilter();
            IP.Contract.SetInvoiceGenerationsSubgridFilter();
            IP.Contract.SetInvoiceSubgridFilter();
            IP.Contract.SetContractLineGridForRentContract();
            IP.Contract.FilterContractLinesGridForRentContract();

            Xrm.Page.getControl("uds_raisetype").setVisible(true);
            IP.Contract.Form.OnChangeRaiseTypeField();

            Xrm.Page.getControl("uds_automaticinvoicegeneration").setVisible(true);
        }
        else {
            this.SetVisibleTabSection("tab_7", "general_section_12", false);
            this.SetFieldsVisible("uds_contracttemplateid", false);
            this.SetFieldsVisible("uds_contractcheckdatecode", false);
            this.SetFieldsVisible("uds_rightofpossession", false);
            this.SetFieldsVisible("uds_billingcontractcheckdateearliestdate", false);
            this.SetFieldsVisible("uds_indexname", false);
        }
    },

    InitializationMaintenanceContract: function () {
        var contractType = Xrm.Page.getAttribute("uds_contracttypeid").getValue();
        var mainContractAttr = Xrm.Page.getAttribute("uds_cooperativelevelcontract");
        var sourceDataAttr = Xrm.Page.getAttribute("uds_sourcedatatypecode");
        var sourceDataCtrl = Xrm.Page.getControl("uds_sourcedatatypecode");
        var groupByCtrl = Xrm.Page.getControl("uds_groupby");


        if (contractType != null && contractType[0].name != null &&
            contractType[0].name.toLowerCase() == "maintenance contract") {

            if (mainContractAttr.getValue() == true) {
                sourceDataCtrl.setVisible(true);
                groupByCtrl.setVisible(false);
                this.SetFieldRequired("uds_sourcedatatypecode", "required");

                if (sourceDataAttr.getValue() != null) {
                    sourceDataCtrl.setDisabled(true);
                }
            }
            //          Xrm.Page.ui.tabs.get('general').sections.get('RENTER').setLabel('BUYER');
            //          Xrm.Page.ui.tabs.get('general').sections.get('TENANT').setLabel('SELLER');

            this.SetVisibleTab("tab_7", true);
            if (Xrm.Page.getAttribute("uds_cooperativelevelcontract").getValue()) {
                Xrm.Page.getControl("uds_automaticinvoicegeneration").setVisible(true);
            }

            this.SetVisibleTabSection("tab_4", "tab_4_section_3", false);
            this.SetVisibleTabSection("tab_4", "tab_4_section_4", true);
            this.SetFieldRequired("uds_priistid", "none");
            this.SetFieldsVisible("cancelon", true);
            this.SetFieldsVisible("uds_contractsigningdate", true);
            this.SetFieldsVisible("uds_contractterminationperiod", true);

            if (sourceDataAttr != null && sourceDataAttr.getValue() == IP.Contract.SourceDataTypeCode.Cooperatives) {
                this.SetVisibleTab("tab_13", true);

                if (Xrm.Page.getAttribute("uds_cooperativelevelcontract").getValue()) {
                    this.SetVisibleTab("BILLING_CONTRACTS", true);
                    this.SetVisibleTabSection('tab_13', 'MAIN_CONTRACT_GROUP_INVOICES_SECTION', true);

                    IP.Contract.SetInvoiceGenerationsSubgridFilter();
                    IP.Contract.SetInvoiceSubgridFilter();
                }
            }

            IP.Contract.SetMaintenanceContractLines();
        }
        else {
            //this.SetVisibleTabSection("tab_4", "tab_4_section_3", true);
            this.SetVisibleTabSection("tab_4", "tab_4_section_4", false);
        }
    },

    SetFieldsVisible: function (fieldname, visible) {

        var ctrl = Xrm.Page.getControl(fieldname);

        if (ctrl != null && typeof visible == "boolean")
            ctrl.setVisible(visible);
    },

    SetFieldRequired: function (fieldname, requirementLevel) {
        var attr = Xrm.Page.getAttribute(fieldname);

        if (attr != null && typeof requirementLevel == "string")
            attr.setRequiredLevel(requirementLevel)
    },

    SetVisibleTabSection: function (tabname, sectionname, show) {
        var tab = Xrm.Page.ui.tabs.get(tabname);
        if (tab != null && typeof show == "boolean") {
            if (sectionname == null)
                tab.setVisible(show);
            else {
                var section = tab.sections.get(sectionname);
                if (section != null) {
                    section.setVisible(show);
                    if (show)
                        tab.setVisible(show);
                }
            }
        }
    },

    SetVisibleTab: function (tabname, show) {
        var tab = Xrm.Page.ui.tabs.get(tabname);
        if (tab != null && typeof show == "boolean") {
            tab.setVisible(show);
        }
    },

    SetVisibleShareField: function () {
        if (Xrm.Page.getAttribute("uds_cooperativelevelcontract").getValue() != true)
            Xrm.Page.getControl("uds_shareslist").setVisible(true);
        else
            Xrm.Page.getControl("uds_shareslist").setVisible(false);
    },

    SetPriceListFilter: function () {
        var entityId = Xrm.Page.data.entity.getId();
        var filterId = "{08F71FA6-69D0-4BC6-8123-219D187D0691}";
        var contractType = Xrm.Page.getAttribute("uds_contracttypeid").getValue();
        var customerId = null;
        var formType = Xrm.Page.ui.getFormType();


        if (contractType != null && contractType[0].name.toLowerCase() == "loan contract" && formType == 1) {
            Xrm.Page.getAttribute("uds_pricelistid").setRequiredLevel("none");
        }

        if (formType == 1 &&
            contractType != null &&
            contractType[0].name.toLowerCase() != "loan contract") {
            entityId = '00000000-0000-0000-0000-000000000000';
        }
        else {
            entityId = Xrm.Page.data.entity.getId();
        }

        var linkFromGroupField = 'uds_sellergroupid';
        if (contractType[0].name.toLowerCase() == "loan contract") {
            linkFromGroupField = 'uds_payergroupid';
        }

        if (formType != 1 || contractType != null && contractType[0].name.toLowerCase() == "loan contract") {
            var priceLevelFetchXml = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='true' >" +
                "  <entity name='pricelevel' >" +
                "    <attribute name='name' />" +
                "    <attribute name='transactioncurrencyid' />" +
                "    <attribute name='enddate' />" +
                "    <attribute name='begindate' />" +
                "    <attribute name='uds_sellerid' />" +
                "    <attribute name='pricelevelid' />" +
                "    <order attribute='name' descending='false' />" +
                "    <filter type='and' >" +
                "      <condition attribute='statecode' operator='eq' value='0' />" +
                "    </filter>" +
                "    <link-entity name='uds_contractconnection' from='uds_partytextid' to='uds_sellerid' alias='ag' >" +
                "      <link-entity name='uds_connectionrole' from='uds_connectionroleid' to='uds_connectionroleid' alias='ah' >" +
                "        <filter type='or' >" +
                "          <condition attribute='uds_name' operator='eq' value='Lainaaja' />" +
                "          <condition attribute='uds_name' operator='eq' value='Laskuttaja' />" +
                "        </filter>" +
                "      </link-entity>" +
                "      <link-entity name='contract' from='" + linkFromGroupField + "' to='uds_payergroupid' alias='ai' >" +
                "        <filter type='and' >" +
                "          <condition attribute='contractid' operator='eq' value='" + entityId + "' />" +
                "        </filter>" +
                "      </link-entity>" +
                "    </link-entity>" +
                "  </entity>" +
                "</fetch>";
            new UDS.Lookup.FilterBuilder()
                .Id(filterId)
                .Name("Price Level")
                .EntityName("pricelevel")
                .FetchXml(priceLevelFetchXml)
                .LayoutXml(
                    new UDS.Lookup.FilterLayoutBuilder()
                        .ObjectTypeCode(UDS.GetEntityMetadata("pricelevel").ObjectTypeCode)
                        .Id("pricelevelid")
                        .Jump("name")
                        .Cell("name", 300)
                        .Cell("transactioncurrencyid", 100)
                        .Cell("statecode", 100)
                        .ToXml()
                )
                .ApplyTo("uds_pricelistid");
        }
        else {
            if (Xrm.Page.getAttribute("customerid").getValue() != null) {
                customerId = Xrm.Page.getAttribute("customerid").getValue()[0].id;
                if (customerId != null) {
                    new UDS.Lookup.FilterBuilder()
                        .Id(filterId)
                        .Name("Price Level")
                        .EntityName("pricelevel")
                        .FetchXml(
                            new UDS.Lookup.FilterQueryBuilder()
                                .EntityName("pricelevel")
                                .Attributes([
                                    "pricelevelid", "name", "transactioncurrencyid", "statecode"
                                ])
                                .Filters([
                                    {
                                        type: "or",
                                        conditions: [
                                            { attribute: "uds_organizationid", operator: "eq", value: customerId },
                                            { attribute: "uds_personid", operator: "eq", value: customerId }
                                        ]
                                    }
                                ])
                                .ToXml()
                        )
                        .LayoutXml(
                            new UDS.Lookup.FilterLayoutBuilder()
                                .ObjectTypeCode(UDS.GetEntityMetadata("pricelevel").ObjectTypeCode)
                                .Id("pricelevelid")
                                .Jump("name")
                                .Cell("name", 300)
                                .Cell("transactioncurrencyid", 100)
                                .Cell("statecode", 100)
                                .ToXml()
                        )
                        .ApplyTo("uds_pricelistid");
                }
                else {
                    this.RemoveFilterFromPriceList();
                }
            }
        }
    },

    SetPatyValuesByContractType: function () {

        var contractType = Xrm.Page.getAttribute("uds_contracttypeid").getValue();
        var partyrole1 = Xrm.Page.getAttribute("uds_partyrole1code");
        var partyrole2 = Xrm.Page.getAttribute("uds_partyrole2code");
        var partyrole1Ctrl = Xrm.Page.getControl("uds_partyrole1code");
        var partyrole2Ctrl = Xrm.Page.getControl("uds_partyrole2code");

        partyrole1Ctrl.setDisabled(false);
        partyrole2Ctrl.setDisabled(false);

        if (contractType != null)
            switch (contractType[0].name.toLowerCase()) {
                case "billing contract": {
                    partyrole1.setValue(IP.Contract.RoleTypeCode.Seller);
                    partyrole2.setValue(IP.Contract.RoleTypeCode.Buyer);
                    break;
                }
                case "loan contract": {
                    partyrole1.setValue(IP.Contract.RoleTypeCode.Creditor);
                    partyrole2.setValue(IP.Contract.RoleTypeCode.Borrower);
                    break;
                }
                case "maintenance contract": {
                    partyrole1.setValue(IP.Contract.RoleTypeCode.Seller);
                    partyrole2.setValue(IP.Contract.RoleTypeCode.Buyer);
                    break;
                }
                case "rent contract": {
                    partyrole1.setValue(IP.Contract.RoleTypeCode.Lessor);
                    partyrole2.setValue(IP.Contract.RoleTypeCode.Tenant);
                    break;
                }
                case "space ownership contract": {
                    partyrole1.setValue(IP.Contract.RoleTypeCode.Conveyor);
                    partyrole2.setValue(IP.Contract.RoleTypeCode.Receiver);
                    partyrole1Ctrl.setDisabled(true);
                    partyrole2Ctrl.setDisabled(true);
                    break;
                }
                case "liability contract": {
                    partyrole1.setValue(IP.Contract.RoleTypeCode.LiabilityGiver);
                    partyrole2.setValue(IP.Contract.RoleTypeCode.LiabilityReceiver);
                    break;
                }
                case "insurance contract": {
                    partyrole1.setValue(IP.Contract.RoleTypeCode.ContractIssuer);
                    partyrole2.setValue(IP.Contract.RoleTypeCode.ContractTaker);
                }
            }
    },

    RemoveFilterFromPriceList: function () {
        document.getElementById("uds_pricelistid").setAttribute("disableViewPicker", 0);
        Xrm.Page.getControl("uds_pricelistid").setDefaultView(this.RemoveFilterFromPriceList.DEFAULT_FILTER_ID);
    },

    SetContractTypeOnCreate: function () {
        if (Xrm.Page.ui.getFormType() == 1) {
            var contractTypeLookup = Xrm.Page.getAttribute("uds_contracttypeid").getValue();
            if (contractTypeLookup == null)
                return;

            var contractTypeId = contractTypeLookup[0].id;
            var cols = ["uds_contracttypecode"];
            var contractType = XrmServiceToolkit.Soap.Retrieve("uds_contracttype", contractTypeId, cols);
            Xrm.Page.getAttribute("uds_contracttypecode").setValue(contractType.attributes["uds_contracttypecode"].value);
        }
    },

    OwnershipContractSpaceCustomLookup: function () {
        var cooperative = Xrm.Page.getAttribute("uds_cooperativeid").getValue();
        var seller = Xrm.Page.getAttribute("customerid").getValue();

        if (cooperative != null)
            IP.Contract.SetSpaceFilterByCooperative(cooperative[0].id);
        else if (seller != null) {
            if (seller[0].entityType == "account") {
                var customer = XrmServiceToolkit.Soap.Retrieve("account", seller[0].id, ["customertypecode"]);
                if (customer.attributes["customertypecode"] != null &&
                    customer.attributes["customertypecode"].value == 752560000)
                    return;
            }

            var record2roleId = IP.Contract.GetConnectionRoleByName("Osakas");
            IP.Contract.SetSpaceFilterByCustomer(seller[0].id, record2roleId);
        } else {
            //Show all spaces
            var filterId = "{05F21AA6-1BD0-2AC6-8133-2192187D0A92}";
            new UDS.Lookup.FilterBuilder()
                .Id(filterId)
                .Name("Space")
                .EntityName("uds_space")
                .FetchXml(
                    new UDS.Lookup.FilterQueryBuilder()
                        .EntityName("uds_space")
                        .Attributes([
                            "uds_spaceid", "uds_name", "uds_cooperativeid", "createdon", "uds_sortfield"
                        ])
                        .Order("uds_sortfield")
                        .ToXml()
                )
                .LayoutXml(
                    new UDS.Lookup.FilterLayoutBuilder()
                        .ObjectTypeCode(UDS.GetEntityMetadata("uds_space").ObjectTypeCode)
                        .Id("uds_spaceid")
                        .Jump("uds_name")
                        .Cell("uds_name", 100)
                        .Cell("uds_cooperativeid", 200)
                        .Cell("createdon", 100)
                        .Cell("uds_sortfield", 100)
                        .ToXml()
                )
                .ApplyTo("uds_spaceid");
        }
    },

    SetCreditApproved: function () {
        var contractType = Xrm.Page.getAttribute("uds_contracttypecode").getValue();
        if (contractType && contractType == IP.Contract.ContractTypeCode.LoanContract) {
            var calcType = Xrm.Page.getAttribute("uds_calculationtypecode").getValue();
            if (calcType && calcType == IP.Contract.CalculationType.Transferred) {
                var startBalance = Xrm.Page.getAttribute("uds_creditstartingbalance").getValue();
                if (startBalance || startBalance == 0)
                    Xrm.Page.getAttribute("uds_creditapproved").setValue(startBalance);
            }
        }

        Xrm.Page.getAttribute("uds_creditapproved").fireOnChange();
    },

    SetFiltersOnLoanLedgerAccountsFields: function () {
        var contractId = Xrm.Page.data.entity.getId();
        var contractType = Xrm.Page.getAttribute("uds_contracttypeid").getValue();

        // Get cooperative with Lainaaja role 
        // connected to contract
        var connectionsFetchXml = "<fetch distinct='false' mapping='logical' output-format='xml-platform' version='1.0' >" +
            "  <entity name='uds_contractconnection' >" +
            "    <attribute name='uds_name' />" +
            "    <attribute name='uds_organizationid' />" +
            "    <order descending='false' attribute='uds_name' />" +
            "    <filter type='and' >" +
            "      <condition attribute='uds_partytypecode' value='1' operator='eq' />" +
            "    </filter>" +
            "	    <link-entity name='uds_connectionrole' from='uds_connectionroleid' to='uds_connectionroleid' alias='ah' >" +
            "      <filter type='or' >" +
            "        <condition attribute='uds_name' operator='eq' value='Lainaaja' />" +
            "      </filter>" +
            "    </link-entity>" +
            "	    <link-entity name='contract' from='uds_payergroupid' to='uds_payergroupid' alias='ai' >" +
            "      <filter type='and' >" +
            "        <condition attribute='contractid' operator='eq' value='" + contractId + "' />" +
            "      </filter>" +
            "    </link-entity>" +
            "  </entity>" +
            "</fetch>";

        var connections = XrmServiceToolkit.Soap.Fetch(connectionsFetchXml);

        if (contractType != null && contractType[0].name != null &&
            contractType[0].name.toLowerCase() == "loan contract" &&
            connections.length > 0) {
            var cooperativeId = connections[0].attributes["uds_organizationid"].id;

            var filterId = "{08F71FA6-69D0-4BC6-8123-219D187D0692}";

            var filterSettings = new UDS.Lookup.FilterBuilder()
                .Id(filterId)
                .Name("LedgerAccounts")
                .EntityName("uds_ledgeraccount")
                .FetchXml(
                    new UDS.Lookup.FilterQueryBuilder()
                        .EntityName("uds_ledgeraccount")
                        .Attributes([
                            "uds_name", "uds_ledgeraccountid", "uds_number"
                        ])
                        .Order("uds_name")
                        .Filters([
                            {
                                type: "and",
                                conditions: [
                                    { attribute: "uds_cooperativeid", operator: "eq", value: cooperativeId }
                                ]
                            }
                        ])
                        .ToXml()
                )
                .LayoutXml(
                    new UDS.Lookup.FilterLayoutBuilder()
                        .ObjectTypeCode(UDS.GetEntityMetadata("uds_ledgeraccount").ObjectTypeCode)
                        .Id("uds_ledgeraccountid")
                        .Jump("uds_name")
                        .Jump("uds_number")
                        .Cell("uds_name", 100)
                        .Cell("uds_number")
                        .ToXml()
                );

            filterSettings.ApplyTo("uds_principalpaymentstobankid");
            filterSettings.ApplyTo("uds_ownersmonthlypaymentsid");
            filterSettings.ApplyTo("uds_owneronetimepaymentsid");
            filterSettings.ApplyTo("uds_ownersmonthlypayments2id");
            filterSettings.ApplyTo("uds_ownersmonthlypayments3id");
            filterSettings.ApplyTo("uds_principalpaymentstobankid1");
            filterSettings.ApplyTo("uds_interestid");
            filterSettings.ApplyTo("uds_otherchargesid");
        }
        else {
            this.SetVisibleTabSection("tab_8", "tab_8_section_7", false);
        }
    }
};

IP.Contract.SetBRCChacngingEnabled = function () {
    var contract = Xrm.Page.getAttribute("uds_primarycontractid");
    if (contract != null && contract.getValue() != null) {
        var cols = ["uds_contracttypecode"];
        var retrievedResult = XrmServiceToolkit.Soap.Retrieve("contract", contract.getValue()[0].id, cols);
        if (retrievedResult != null) {
            for (attr in retrievedResult.attributes) {
                if (attr == "uds_contracttypecode") {
                    if (retrievedResult.attributes["uds_contracttypecode"].value == IP.Contract.ContractTypeCode.RentContract) {
                        var control = Xrm.Page.ui.controls.get("uds_brcid");
                        if (control != null) {
                            control.setDisabled(false);
                        }
                    }
                }
            }
        }
    }
}

IP.Contract.SetSpaceFilterByCooperative = function (cooperativeId) {
    var filterId = "{05F71FA6-6BD0-4AC6-8133-2192187D0A92}";
    new UDS.Lookup.FilterBuilder()
        .Id(filterId)
        .Name("Space")
        .EntityName("uds_space")
        .FetchXml(
            new UDS.Lookup.FilterQueryBuilder()
                .EntityName("uds_space")
                .Attributes([
                    "uds_spaceid", "uds_name", "uds_cooperativeid", "createdon", "uds_sortfield"
                ])
                .Order("uds_sortfield")
                .Filters([
                    {
                        type: "and",
                        conditions: [
                            { attribute: "uds_cooperativeid", operator: "eq", value: cooperativeId }
                        ]
                    }
                ])
                .ToXml()
        )
        .LayoutXml(
            new UDS.Lookup.FilterLayoutBuilder()
                .ObjectTypeCode(UDS.GetEntityMetadata("uds_space").ObjectTypeCode)
                .Id("uds_spaceid")
                .Jump("uds_name")
                .Cell("uds_name", 100)
                .Cell("uds_cooperativeid", 200)
                .Cell("createdon", 100)
                .Cell("uds_sortfield", 100)
                .ToXml()
        )
        .ApplyTo("uds_spaceid");
}

IP.Contract.setSizeForPopupWindow = function () {
    var docWidth = document.body.clientWidth;
    var docHeight = document.body.clientHeight + 60;
    var popup = $('#InlineDialog', window.parent.document);
    var frame = $('#InlineDialog_Iframe', window.parent.document);
    var header = $('#InlineDialog > div', window.parent.document);

    if (popup.length) {
        $(popup)
            .css('width', docWidth)
            .css('height', docHeight)
            .css('marginTop', -docHeight / 2)
            .css('marginLeft', -docWidth / 2);

        $(frame)
            .css('width', '100%')
            .css('height', '100%');
        $(header)
            .css('width', '100%');
    }
}

IP.Contract.SetSellerBySpace = function (space) {
    var activeonDate = Xrm.Page.getAttribute("activeon").getValue();
    if (activeonDate == null)
        return;

    activeonDate.setDate(activeonDate.getDate() + 1);
    var startDate = activeonDate.getFullYear() + "-" + (activeonDate.getMonth() + 1) + "-" + activeonDate.getDate();

    var osakasId = IP.Contract.GetConnectionRoleByName("Osakas");

    var fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">' +
        '<entity name="connection">' +
        '<attribute name="record2id" />' +
        '<attribute name="name" />' +
        '<order attribute="effectiveend" descending="false" />' +
        '<filter type="and">' +
        '<filter type="and">' +
        '<condition attribute="statecode" operator="eq" value="0" />' +
        '<condition attribute="record1id" operator="eq" value="' + space.id + '" />' +
        '<condition attribute="record2roleid" operator="eq" value="' + osakasId + '" />' +
        '</filter>' +
        '<filter type="or">' +
        '<condition attribute="effectivestart" operator="on-or-before" value="' + startDate + '" />' +
        '<condition attribute="effectivestart" operator="null" />' +
        '</filter>' +
        '<filter type="or">' +
        '<condition attribute="effectiveend" operator="on-or-after" value="' + startDate + '" />' +
        '<condition attribute="effectiveend" operator="null" />' +
        '</filter>' +
        '</filter>' +
        '</entity>' +
        '</fetch>';

    var spaceOwnersConn = XrmServiceToolkit.Soap.Fetch(fetchXml);
    if (spaceOwnersConn.length < 1) {
        Xrm.Page.getAttribute("customerid").setValue(null);
    } else {
        var spaceOwner = spaceOwnersConn[0].attributes["record2id"];
        Xrm.Page.getAttribute("customerid").setValue([
            {
                id: spaceOwner.id,
                name: spaceOwner.name,
                entityType: spaceOwner.logicalName
            }
        ]);
    }
    Xrm.Page.getAttribute("customerid").fireOnChange();
    IP.Contract.SetOwnerConnection(spaceOwnersConn)
}

IP.Contract.SetSpaceFilterByCustomer = function (customerId, roleId) {
    var activeonDate = Xrm.Page.getAttribute("activeon").getValue();
    if (activeonDate == null)
        return;

    activeonDate.setDate(activeonDate.getDate() + 1);
    var newDate = activeonDate.getFullYear() + "-" + (activeonDate.getMonth() + 1) + "-" + activeonDate.getDate();

    var filterId = "{08F71FA6-69D0-4BC6-8123-219D187D0692}";
    new UDS.Lookup.FilterBuilder()
        .Id(filterId)
        .Name("Space")
        .EntityName("uds_space")
        .FetchXml(
            new UDS.Lookup.FilterQueryBuilder()
                .EntityName("uds_space")
                .Attributes([
                    "uds_spaceid", "uds_name", "uds_cooperativeid", "createdon", "uds_sortfield"
                ])
                .Order("uds_sortfield")
                .LinkEntities([
                    {
                        name: "connection",
                        from: "record1id",
                        to: "uds_spaceid",
                        intersect: "true",
                        filters: [
                            {
                                type: "and",
                                conditions: [
                                    { attribute: "record2id", operator: "eq", value: customerId },
                                    { attribute: "record2roleid", operator: "eq", value: roleId },
                                    { attribute: "statecode", operator: "eq", value: 0 }
                                ]
                            },
                            {
                                type: "or",
                                conditions: [
                                    { attribute: "effectiveend", operator: "on-or-after", value: newDate },
                                    { attribute: "effectiveend", operator: "null" }
                                ]
                            }
                        ]
                    }
                ])
                .ToXml()
        )
        .LayoutXml(
            new UDS.Lookup.FilterLayoutBuilder()
                .ObjectTypeCode(UDS.GetEntityMetadata("uds_space").ObjectTypeCode)
                .Id("uds_spaceid")
                .Jump("uds_name")
                .Cell("uds_name", 100)
                .Cell("uds_cooperativeid", 200)
                .Cell("createdon", 100)
                .Cell("uds_sortfield", 100)
                .ToXml()
        )
        .ApplyTo("uds_spaceid");
}

IP.Contract.GetFirstContractTemplate = function () {
    var templateQuery = new UDS.Query.QueryBuilder("ContractTemplate")
        .Select("ContractTemplateId, Name");
    var templates = new UDS.Query.QueryExecutor(templateQuery).RetrieveMultiple();

    if (templates != null && templates.length > 0) {
        return templates[0];
    }

    return null;
}

IP.Contract.GetProducts = function (contractId) {
    var productsFetchXml =
        "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='true'>" +
        "<entity name='product'>" +
        "<attribute name='name' />" +
        "<attribute name='productid' />" +
        "<order attribute='name' descending='false' />" +
        "<link-entity name='productpricelevel' from='productid' to='productid' alias='ap'>" +
        "<link-entity name='pricelevel' from='pricelevelid' to='pricelevelid' alias='aq'>" +
        "<link-entity name='contract' from='uds_pricelistid' to='pricelevelid' alias='ar'>" +
        "<filter type='and'>" +
        "<condition attribute='contractid' operator='eq' uitype='contract' value='" + contractId + "' />" +
        "</filter>" +
        "</link-entity>" +
        "</link-entity>" +
        "</link-entity>" +
        "</entity>" +
        "</fetch>";

    var productsFetchedData = XrmServiceToolkit.Soap.Fetch(productsFetchXml);

    if (productsFetchedData && productsFetchedData.length > 0) {
        var products = [];

        for (var i = 0; i < productsFetchedData.length; i++) {
            var productName = productsFetchedData[i].attributes['name'].value;
            var productId = productsFetchedData[i].attributes['productid'].value;

            products[i] = { Name: productName, ProductId: productId };
        }

        return products;
    }
    return null;
}

IP.Contract.GetContractTypeByName = function (contractType) {
    var contractTypeQuery = new UDS.Query.QueryBuilder("uds_contracttype")
        .Select("uds_contracttypeId, uds_contracttypecode")
        .Filter("and")
        .Condition("uds_name", "eq", contractType, "String");
    var contractTypes = new UDS.Query.QueryExecutor(contractTypeQuery).RetrieveMultiple();
    if (contractTypes != null) {
        return contractTypes[0];
    }
    return null;
}

IP.Contract.GetContractTypeByTypeCode = function (contractType) {
    var contractTypeQuery = new UDS.Query.QueryBuilder("uds_contracttype")
        .Select("uds_contracttypeId, uds_name")
        .Filter("and")
        .Condition("uds_contracttypecode", "eq", contractType, "OptionSet");
    var contractTypes = new UDS.Query.QueryExecutor(contractTypeQuery).RetrieveMultiple();
    if (contractTypes != null) {
        return contractTypes[0];
    }
    return null;
}

IP.Contract.GetProductById = function (productId) {
    var productQuery = new UDS.Query.QueryBuilder("Product")
        .Select("DefaultUoMScheduleId, uds_CalculationType, uds_vatcode, uds_priceincludesvat, DefaultUoMId")
        .Filter("and")
        .Condition("ProductId", "eq", productId, "Guid");
    return new UDS.Query.QueryExecutor(productQuery).Retrieve();
}

IP.Contract.GetDefaulPriceBySeller = function (seller) {
    var priceSellerField = (seller.typename == "account") ? "uds_organizationid" : "uds_personid";

    var defaultPriceQuery = new UDS.Query.QueryBuilder("PriceLevel")
        .Select("PriceLevelId, Name")
        .Filter("and")
        .Condition(priceSellerField, "eq", seller.id, "Lookup")
        .Condition("uds_isdefaultprice", "eq", true, "Boolean");

    var priceLevels = new UDS.Query.QueryExecutor(defaultPriceQuery).RetrieveMultiple();

    return priceLevels[0];
}

IP.Contract.GetUnitsByProductId = function (productId) {
    var product = IP.Contract.GetProductById(productId);

    var unitsQuery = new UDS.Query.QueryBuilder("UoM")
        .Select("Name, UoMId")
        .Filter("and")
        .Condition("UoMScheduleId", "eq", product.DefaultUoMScheduleId.Id, "Lookup");
    var units = new UDS.Query.QueryExecutor(unitsQuery).RetrieveMultiple();
    return units;
}

IP.Contract.GetContractByContractId = function (contractId) {
    var contractQuery = new UDS.Query.QueryBuilder("Contract")
        .Select("CustomerId, Title, uds_pricelistid, uds_sourcedatatypecode, uds_ContractTypeId, uds_contracttypecode, ActiveOn, ExpiresOn, BillingStartOn, BillingEndOn, uds_invoicelanguagecodecontract, uds_invoicestatuscodecontract, uds_enddatetype, uds_cooperativelevelcontract, uds_calculationtypecode")
        .Filter("and")
        .Condition("ContractId", "eq", contractId, "Guid");
    var contract = new UDS.Query.QueryExecutor(contractQuery).Retrieve();

    return contract;
}

IP.Contract.IsContainsChildContracts = function (contractId) {
    var contractQuery = new UDS.Query.QueryBuilder("Contract")
        .Select("ContractId")
        .Top(1)
        .Filter("and")
        .Condition("uds_primarycontractid", "eq", contractId, "Lookup");

    var contracts = new UDS.Query.QueryExecutor(contractQuery).RetrieveMultiple();

    if (contracts != null && contracts.length > 0) {
        return true;
    }

    return false;
}


IP.Contract.GetCooperativeIdByContractId = function (contractId) {
    var contractQuery = new UDS.Query.QueryBuilder("Contract")
        .Select("CustomerId, uds_ContractTypeId, uds_organizationid")
        .Filter("and")
        .Condition("ContractId", "eq", contractId, "Guid");
    var contract = new UDS.Query.QueryExecutor(contractQuery).Retrieve();

    if (contract.uds_ContractTypeId.Name.toLowerCase() == "loan contract") {
        //return contract.uds_organizationid.Id;
        var customLainaajaRoleId = IP.Contract.GetCustomConnectionRoleByName("Lainaaja");
        if (customLainaajaRoleId != null) {
            var payerGroupId = Xrm.Page.getAttribute("uds_sellergroupid").getValue()
                && Xrm.Page.getAttribute("uds_sellergroupid").getValue()[0].id;
            if (payerGroupId)
                return IP.Contract.GetConnectionByRoleIdAndPayerGroup(customLainaajaRoleId, payerGroupId);
        }

        return null;
    }
    return contract.CustomerId.Id;
}

IP.Contract.GetCurrencies = function () {
    var currencyQuery = new UDS.Query.QueryBuilder("TransactionCurrency")
        .Select("CurrencyName, TransactionCurrencyId");
    var currency = new UDS.Query.QueryExecutor(currencyQuery).RetrieveMultiple();

    return currency;
}

IP.Contract.GetSpacesByCooperativeId = function (cooperativeId) {
    var spacesFetchXml =
        "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='true'>" +
        "<entity name='uds_space'>" +
        "<attribute name='uds_spaceid' />" +
        "<attribute name='uds_name' />" +
        "<attribute name='uds_building' />" +
        "<attribute name='uds_sharenumbers' />" +
        "<attribute name='uds_typedescription' />" +
        "<attribute name='uds_squaremeters' />" +
        "<attribute name='uds_spaceid' />" +
        "<attribute name='uds_sort' />" +
        "<order attribute='uds_name' descending='false' />" +
        //      "<link-entity name='uds_cooperativecontractline' from='uds_spaceid' to='uds_spaceid' alias='ac'>" +
        //        "<link-entity name='uds_cooperativecontract' from='uds_cooperativecontractid' to='uds_cooperativecontractid' alias='ad'>" +
        "<filter type='and'>" +
        "<condition attribute='uds_cooperativeid' operator='eq' uitype='account' value='" + cooperativeId + "' />" +
        "</filter>" +
        //         "</link-entity>" +
        //       "</link-entity>" +
        "</entity>" +
        "</fetch>";

    var spacesFetchedData = XrmServiceToolkit.Soap.Fetch(spacesFetchXml);

    if (spacesFetchedData && spacesFetchedData.length > 0) {
        var spaces = [];

        for (var i = 0; i < spacesFetchedData.length; i++) {
            var nameAttr = spacesFetchedData[i].attributes['uds_name'];
            var buildingAttr = spacesFetchedData[i].attributes['uds_building'];
            var shareNumbersAttr = spacesFetchedData[i].attributes['uds_sharenumbers'];
            var typeDescAttr = spacesFetchedData[i].attributes['uds_typedescription'];
            var squareMetersAttr = spacesFetchedData[i].attributes['uds_squaremeters'];
            var spaceIdAttr = spacesFetchedData[i].attributes['uds_spaceid'];
            var sort = spacesFetchedData[i].attributes['uds_sort'];

            spaces[i] = {
                uds_name: (nameAttr != null) ? nameAttr.value : "",
                uds_building: (buildingAttr != null) ? buildingAttr.name : "",
                uds_sharenumbers: (shareNumbersAttr != null) ? shareNumbersAttr.value : "",
                uds_typedescription: (typeDescAttr != null) ? typeDescAttr.value : "",
                uds_squaremeters: (squareMetersAttr != null) ? squareMetersAttr.value : "",
                uds_spaceId: (spaceIdAttr != null) ? spaceIdAttr.value : "",
                sort: (sort != null) ? sort.value : 999999
            };
        }

        var compareArr = function (a, b) {
            if (parseInt(a.sort, 10) > parseInt(b.sort, 10)) return 1;
            if (parseInt(a.sort, 10) < parseInt(b.sort, 10)) return -1;
        }

        spaces.sort(compareArr);

        return spaces;
    }
    return null;
}

IP.Contract.GetSpacesDataSourceByCooperativeId = function (cooperativeId) {
    var spaces = IP.Contract.GetSpacesByCooperativeId(cooperativeId);
    var spaceDS = new Array();

    for (var i = 0; i < spaces.length; i++) {
        spaceDS[i] = {
            "ID": i + 1,
            "Building": spaces[i].uds_building,
            "Name": spaces[i].uds_name,
            "TypeDescription": spaces[i].uds_typedescription,
            "ShareNumbers": spaces[i].uds_sharenumbers,
            "SquareMeters": spaces[i].uds_squaremeters,
            "SpaceId": spaces[i].uds_spaceId
        }
    }

    return spaceDS;
}

IP.Contract.GetContractById = function (contractId) {
    var contractQuery = new UDS.Query.QueryBuilder("Contract")
        .Select("uds_pricelistid, uds_recalculatecontract, uds_payergroupcontractsgenerationcode")
        .Filter("and")
        .Condition("ContractId", "eq", contractId, "Guid");
    var contract = new UDS.Query.QueryExecutor(contractQuery).Retrieve();

    return contract;
}

IP.Contract.GetProductPriceLevelByPriceAndProductAndUom = function (priceId, productId, uomId) {
    var productPriceLevelQuery = new UDS.Query.QueryBuilder("ProductPriceLevel")
        .Select("Amount")
        .Filter("and")
        .Condition("ProductId", "eq", productId, "Lookup")
        .Condition("PriceLevelId", "eq", priceId, "Lookup")
        .Condition("UoMId", "eq", uomId, "Lookup");
    var productPriceLevels = new UDS.Query.QueryExecutor(productPriceLevelQuery).RetrieveMultiple();

    if (productPriceLevels != null && productPriceLevels.length > 0) {
        return productPriceLevels[0];
    }

    return null;
}

IP.Contract.ExecuteAddSpacesToContractAction = function (param) {
    var actionName = "uds_GenerateSpacesForContract";

    param.contractId = param.contractId.toString().replace("{", "").replace("}", "");

    param.spaces = param.spaces.toString().replace(new RegExp("{", 'g'), "");
    param.spaces = param.spaces.toString().replace(new RegExp("}", 'g'), "");

    param.productId = param.productId.toString().replace("{", "").replace("}", "");
    param.uomId = param.uomId.toString().replace("{", "").replace("}", "");

    var startDateData = param.startDate.getFullYear() + ';' + (param.startDate.getMonth() + 1) + ';' + param.startDate.getDate();
    var endDateData = param.endDate.getFullYear() + ';' + (param.endDate.getMonth() + 1) + ';' + param.endDate.getDate();

    // Creating the request XML for calling the Action
    var requestXML =
        "<s:Envelope xmlns:s='http://schemas.xmlsoap.org/soap/envelope/'>\
          <s:Body>\
            <Execute xmlns='http://schemas.microsoft.com/xrm/2011/Contracts/Services' xmlns:i='http://www.w3.org/2001/XMLSchema-instance'>\
              <request xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts'>\
                <a:Parameters xmlns:b='http://schemas.datacontract.org/2004/07/System.Collections.Generic'>\
                  <a:KeyValuePairOfstringanyType>\
                    <b:key>ContractId</b:key>\
                    <b:value i:type='c:string' xmlns:c='http://www.w3.org/2001/XMLSchema'>" + param.contractId + "</b:value>\
              </a:KeyValuePairOfstringanyType>\
              <a:KeyValuePairOfstringanyType>\
                <b:key>Spaces</b:key>\
                <b:value i:type='c:string' xmlns:c='http://www.w3.org/2001/XMLSchema'>" + param.spaces + "</b:value>\
              </a:KeyValuePairOfstringanyType>\
              <a:KeyValuePairOfstringanyType>\
                <b:key>IsUseCustomPrice</b:key>\
                <b:value i:type='c:string' xmlns:c='http://www.w3.org/2001/XMLSchema'>" + param.isUseCustomPrice + "</b:value>\
              </a:KeyValuePairOfstringanyType>\
              <a:KeyValuePairOfstringanyType>\
                <b:key>CurrencyId</b:key>\
                <b:value i:type='c:string' xmlns:c='http://www.w3.org/2001/XMLSchema'>" + param.currencyId + "</b:value>\
              </a:KeyValuePairOfstringanyType>\
              <a:KeyValuePairOfstringanyType>\
                <b:key>Rate</b:key>\
                <b:value i:type='c:string' xmlns:c='http://www.w3.org/2001/XMLSchema'>" + param.rate + "</b:value>\
              </a:KeyValuePairOfstringanyType>\
              <a:KeyValuePairOfstringanyType>\
                <b:key>CalculationTypeCode</b:key>\
                <b:value i:type='c:string' xmlns:c='http://www.w3.org/2001/XMLSchema'>" + param.calculationTypeCode + "</b:value>\
              </a:KeyValuePairOfstringanyType>\
              <a:KeyValuePairOfstringanyType>\
                <b:key>ProductId</b:key>\
                <b:value i:type='c:string' xmlns:c='http://www.w3.org/2001/XMLSchema'>" + param.productId + "</b:value>\
              </a:KeyValuePairOfstringanyType>\
              <a:KeyValuePairOfstringanyType>\
                <b:key>UomId</b:key>\
                <b:value i:type='c:string' xmlns:c='http://www.w3.org/2001/XMLSchema'>" + param.uomId + "</b:value>\
              </a:KeyValuePairOfstringanyType>\
              <a:KeyValuePairOfstringanyType>\
                <b:key>VATRate</b:key>\
                <b:value i:type='c:string' xmlns:c='http://www.w3.org/2001/XMLSchema'>" + param.vatRate + "</b:value>\
              </a:KeyValuePairOfstringanyType>\
              <a:KeyValuePairOfstringanyType>\
                <b:key>IsPriceIncludesVAT</b:key>\
                <b:value i:type='c:string' xmlns:c='http://www.w3.org/2001/XMLSchema'>" + param.isPriceIncludesVAT + "</b:value>\
              </a:KeyValuePairOfstringanyType>\
              <a:KeyValuePairOfstringanyType>\
                <b:key>StartDate</b:key>\
                <b:value i:type='c:string' xmlns:c='http://www.w3.org/2001/XMLSchema'>" + startDateData + "</b:value>\
              </a:KeyValuePairOfstringanyType>\
              <a:KeyValuePairOfstringanyType>\
                <b:key>EndDate</b:key>\
                <b:value i:type='c:string' xmlns:c='http://www.w3.org/2001/XMLSchema'>" + endDateData + "</b:value>\
              </a:KeyValuePairOfstringanyType>\
            </a:Parameters>\
            <a:RequestId i:nil='true' />\
            <a:RequestName>"+ actionName + "</a:RequestName>\
          </request>\
        </Execute>\
      </s:Body>\
    </s:Envelope>";

    try {
        var result = UDS.ActionExecutor.Execute(
            {
                requestXml: requestXML,
                async: false,
                successCallback: null,
                errorCallback: null
            });
        if (result.name == "Error") {
            alert(result.message);
            return false;
        }
    } catch (e) {
        alert(e.message);
        return false;
    }
    return true;
}

IP.Contract.ExecuteAddBilingContractAction = function (contractId, contractLines, startDate, endDate, isOpenDate) {
    var actionName = "uds_CreateBillingContract";

    var startDayData = startDate.getFullYear() + ';' + (startDate.getMonth() + 1) + ';' + startDate.getDate();
    var endDayData = endDate.getFullYear() + ';' + (endDate.getMonth() + 1) + ';' + endDate.getDate();

    // Creating the request XML for calling the Action
    var requestXML =
        "<s:Envelope xmlns:s='http://schemas.xmlsoap.org/soap/envelope/'>\
          <s:Body>\
            <Execute xmlns='http://schemas.microsoft.com/xrm/2011/Contracts/Services' xmlns:i='http://www.w3.org/2001/XMLSchema-instance'>\
              <request xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts'>\
                <a:Parameters xmlns:b='http://schemas.datacontract.org/2004/07/System.Collections.Generic'>\
                  <a:KeyValuePairOfstringanyType>\
                    <b:key>ContractId</b:key>\
                    <b:value i:type='c:string' xmlns:c='http://www.w3.org/2001/XMLSchema'>" + contractId + "</b:value>\
              </a:KeyValuePairOfstringanyType>\
              <a:KeyValuePairOfstringanyType>\
                <b:key>ContractLines</b:key>\
                <b:value i:type='c:string' xmlns:c='http://www.w3.org/2001/XMLSchema'>" + contractLines + "</b:value>\
              </a:KeyValuePairOfstringanyType>\
              <a:KeyValuePairOfstringanyType>\
                <b:key>StartDate</b:key>\
                <b:value i:type='c:string' xmlns:c='http://www.w3.org/2001/XMLSchema'>" + startDayData + "</b:value>\
              </a:KeyValuePairOfstringanyType>\
              <a:KeyValuePairOfstringanyType>\
                <b:key>EndDate</b:key>\
                <b:value i:type='c:string' xmlns:c='http://www.w3.org/2001/XMLSchema'>" + endDayData + "</b:value>\
              </a:KeyValuePairOfstringanyType>\
              <a:KeyValuePairOfstringanyType>\
                <b:key>IsOpenDate</b:key>\
                <b:value i:type='c:boolean' xmlns:c='http://www.w3.org/2001/XMLSchema'>" + isOpenDate + "</b:value>\
              </a:KeyValuePairOfstringanyType>\
            </a:Parameters>\
            <a:RequestId i:nil='true' />\
            <a:RequestName>"+ actionName + "</a:RequestName>\
          </request>\
        </Execute>\
      </s:Body>\
    </s:Envelope>";

    try {
        var result = UDS.ActionExecutor.Execute(
            {
                requestXml: requestXML,
                async: false,
                successCallback: null,
                errorCallback: null
            });
        if (result.name == "Error") {
            alert(result.message);
            return false;
        }
        else if (result.BillingContractId != null) {
            return result.BillingContractId;
        }
    } catch (e) {
        alert(e.message);
        return false;
    }
    return true;
}

IP.Contract.ExecuteUpdateContractByPriceLevelAction = function (contractId) {
    let entityId = Xrm.Page.data.entity.getId();
    let entityName = 'contract';
    let requestName = "uds_UpdateContractByPriceLevel";

    let requestXML = "";
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

        if (result.name == "Error") {
            alert(result.message);
        }
    }
    catch (e) {
        alert(e.message);
    }
}


IP.Contract.GetDateFromString = function (value) {
    var a;
    if (typeof value === 'string') {
        a = /Date\(([-+]?\d+)\)/.exec(value);
        if (a) {
            return new Date(parseInt(value.replace("/Date(", "").replace(")/", ""), 10));
        }
    }
    return null;
};

IP.Contract.Ribbon.OpenAddBillingContractForm = function (contractId) {
    var dialogWebResource = "$webresource:uds_AddBillingContractDialog.html";

    var cooperativeId = IP.Contract.GetCooperativeIdByContractId(contractId);
    var contract = IP.Contract.GetContractByContractId(contractId);

    var startDate = IP.Contract.GetDateFromString(contract.BillingStartOn);
    var endDate = IP.Contract.GetDateFromString(contract.BillingEndOn);

    var dialog = new Mscrm.CrmDialog(Mscrm.CrmUri.create(dialogWebResource), {
        ContractId: contractId,
        StartDate: (startDate != null) ? startDate : new Date(),
        EndDate: (endDate != null) ? endDate : new Date(),
        IsOpenDate: (contract.uds_enddatetype == true) ? false : true
    }, 1040, 700, null);
    dialog.setCallbackReference(saveDialogValues);
    dialog.show();

    function saveDialogValues(result) {
        Xrm.Page.ui.controls.get("Contract_lines").refresh();
    }
}

IP.Contract.GetExistLinesIdForAddBiilingContract = function (contractId) {

    return null;
}

IP.Contract.GetLinesByContract = function (contractId) {
    var linesFetchXml =
        "<fetch version='1.0' output-format='xml-platform' mapping='logical'>" +
        "<entity name='contractdetail'>" +
        "<attribute name='title' />" +
        "<attribute name='productid' />" +
        "<attribute name='contractdetailid' />" +
        "<attribute name='uomid' />" +
        "<attribute name='uds_quantity' />" +
        "<attribute name='uds_rate' />" +
        "<attribute name='uds_priceincludingvat' />" +
        "<attribute name='uds_vatratecode' />" +
        "<attribute name='uds_totalamountvatincluding' />" +
        "<order attribute='title' descending='false' />" +
        "<order attribute='productid' descending='false' />" +
        "<link-entity name='uds_space' from='uds_spaceid' to='uds_spaceid' link-type='outer' alias='space'>" +
        "<attribute name='uds_sort' />" +
        "</link-entity>" +
        "<filter type='and'>" +
        "<condition attribute='statecode' operator='eq' value='0' />" +
        "<condition attribute='uds_contractid' operator='eq' uitype='contract' value='" + contractId + "' />";

    linesFetchXml += "</filter></entity></fetch>";

    var linesFetchedData = XrmServiceToolkit.Soap.Fetch(linesFetchXml);

    if (linesFetchedData && linesFetchedData.length > 0) {
        var lines = [];

        for (var i = 0; i < linesFetchedData.length; i++) {
            var titleAttr = linesFetchedData[i].attributes['title'];
            var productAttr = linesFetchedData[i].attributes['productid'];
            var contractDetailAttr = linesFetchedData[i].attributes['contractdetailid'];
            var uomAttr = linesFetchedData[i].attributes['uomid'];
            var quantityAttr = linesFetchedData[i].attributes['uds_quantity'];
            var rateAttr = linesFetchedData[i].attributes['uds_rate'];
            var priceIncludingVatAttr = linesFetchedData[i].attributes['uds_priceincludingvat'];
            var vatRateCodeAttr = linesFetchedData[i].attributes['uds_vatratecode'];
            var amountVatIncludingAttr = linesFetchedData[i].attributes['uds_totalamountvatincluding'];
            var sort = linesFetchedData[i].attributes['space.uds_sort'];

            lines[i] = {
                title: (titleAttr != null) ? titleAttr.value : "",
                productid: (productAttr != null) ? productAttr.name : "",
                uomid: (uomAttr != null) ? uomAttr.name : "",
                uds_quantity: (quantityAttr != null) ? quantityAttr.value : "",
                uds_rate: (rateAttr != null) ? rateAttr.value : "",
                uds_priceincludingvat: (priceIncludingVatAttr != null && priceIncludingVatAttr.value == true) ? "Yes" : "No",
                uds_vatratecode: (vatRateCodeAttr != null) ? vatRateCodeAttr.value : "",
                contractdetailid: (contractDetailAttr != null) ? contractDetailAttr.value : "",
                uds_totalamountvatincluding: (amountVatIncludingAttr != null) ? amountVatIncludingAttr.value : "",
                sort: (sort != null) ? sort.value : 999999
            };
        }

        var compareArr = function (a, b) {
            if (parseInt(a.sort, 10) > parseInt(b.sort, 10)) return 1;
            if (parseInt(a.sort, 10) < parseInt(b.sort, 10)) return -1;
        }

        lines.sort(compareArr);
        return lines;
    }
    return null;
}

// Get Data Source for create new billing contract dialog form
IP.Contract.GetContractLinesDataSource = function (contractId) {
    var lines = IP.Contract.GetLinesByContract(contractId);
    var linesDS = new Array();

    if (lines != null) {
        for (var i = 0; i < lines.length; i++) {
            linesDS[i] = {
                "ID": i + 1,
                "Title": lines[i].title,
                "Product": lines[i].productid,
                "Uom": lines[i].uomid,
                "Quantity": lines[i].uds_quantity,
                "Rate": lines[i].uds_rate,
                "AmountVatIncluding": lines[i].uds_totalamountvatincluding,
                "ContractLineId": lines[i].contractdetailid
            }
        }
    }

    return linesDS;
};

IP.Contract.FilterContractLinesGrid = function () {
    return;
    var contractType = Xrm.Page.getAttribute("uds_contracttypeid").getValue();

    if (contractType != null && contractType[0].name != null &&
        contractType[0].name.toLowerCase() == "rent contract") {
        return;
    }

    var objSubGrid = document.getElementById("Contract_lines");

    if (objSubGrid == null) {
        setTimeout(IP.Contract.FilterContractLinesGrid, 2000);
        return;
    }

    var fetchXml = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>\
                      <entity name='contractdetail'>\
                        <attribute name='productid'/>\
                        <attribute name='uds_calculationtypecode'/>\
                        <attribute name='uds_rate'/>\
                        <attribute name='uds_spaceid'/>\
                        <attribute name='activeon'/>\
                        <attribute name='expireson'/>\
                        <attribute name='uomid'/>\
                        <attribute name='uds_vatamount'/>\
                        <attribute name='uds_totalamountvatincluding'/>\
                        <attribute name='uds_amountvatexcluding'/>\
                        <attribute name='uds_vatratecode'/>\
                        <attribute name='uds_quantity'/>\
                        <attribute name='uds_sortingfield'/>\
                        <attribute name='contractdetailid'/>\
                        <filter type='and'>\
                          <condition attribute='statecode' operator='eq' value='0'/>\
                          <condition attribute='uds_contractid' operator='eq' value='" + Xrm.Page.data.entity.getId() + "'/>\
                          <condition attribute='uds_parentcontractdetailid' operator='null' uitype='contractdetail' />\
                        </filter>\
                        <order attribute='uds_sortingfield' descending='false'/>\
                        <link-entity name='uds_space' to='uds_spaceid' from='uds_spaceid' link-type='outer' alias='a_0a673174f437e41180e500155d05fa06'>\
                          <attribute name='uds_stairway'/>\
                          <attribute name='uds_floor'/>\
                          <attribute name='uds_usagetype'/>\
                          <attribute name='uds_squaremeters'/>\
                          <attribute name='uds_cooperativeid'/>\
                        </link-entity>\
                      </entity>\
                    </fetch>";

    var layoutXml = "<grid name='contractdetails' object='1011' jump='title' select='1' icon='1' preview='1'>\
                        <row name='contractdetail' id='contractdetailid'>\
                            <cell name='uds_spaceid' width='100' />\
                            <cell name='space.uds_cooperativeid' width='100' disableSorting='1' relatedentityname='uds_space' relatedentityattr='uds_spaceid' primaryentityattr='uds_spaceid' relationshipname='uds_uds_space_contractdetail_spaceid' />\
                            <cell name='activeon' width='100' />\
                            <cell name='expireson' width='100' />\
                            <cell name='productid' width='200' />\
                            <cell name='uomid' width='75' />\
                            <cell name='uds_rate' width='100' />\
                            <cell name='uds_quantity' width='75' />\
                            <cell name='uds_vatratecode' width='75' />\
                            <cell name='uds_amountvatexcluding' width='125' />\
                            <cell name='uds_vatamount' width='100' />\
                            <cell name='uds_totalamountvatincluding' width='150' />\
                            <cell name='uds_calculationtypecode' width='125' />\
                            <cell name='a_0a673174f437e41180e500155d05fa06.uds_squaremeters' width='200' disableSorting='1' relatedentityname='uds_space' relatedentityattr='uds_spaceid' primaryentityattr='uds_spaceid' relationshipname='uds_uds_space_contractdetail_spaceid' />\
                            <cell name='a_0a673174f437e41180e500155d05fa06.uds_usagetype' width='200' disableSorting='1' relatedentityname='uds_space' relatedentityattr='uds_spaceid' primaryentityattr='uds_spaceid' relationshipname='uds_uds_space_contractdetail_spaceid' />\
                            <cell name='a_0a673174f437e41180e500155d05fa06.uds_stairway' width='75' disableSorting='1' relatedentityname='uds_space' relatedentityattr='uds_spaceid' primaryentityattr='uds_spaceid' relationshipname='uds_uds_space_contractdetail_spaceid' />\
                            <cell name='a_0a673174f437e41180e500155d05fa06.uds_floor' width='75' disableSorting='1' relatedentityname='uds_space' relatedentityattr='uds_spaceid' primaryentityattr='uds_spaceid' relationshipname='uds_uds_space_contractdetail_spaceid' />\
                            <cell name='uds_sortingfield' width='100' />\
                        </row>\
                    </grid>";

    //apply layout and filtered fetchXML
    objSubGrid.control.SetParameter("fetchXml", fetchXml);
    objSubGrid.control.SetParameter("layoutXml", layoutXml);

    //Refresh grid to show filtered records only.
    objSubGrid.control.Refresh();

};

IP.Contract.FilterContractLinesGridForRentContract = function () {
    var objSubGrid = document.getElementById("Contract_lines");

    if (objSubGrid == null) {
        setTimeout(IP.Contract.FilterContractLinesGridForRentContract, 2000);
        return;
    }

    var currentId = Xrm.Page.data.entity.getId();
    var fetchXml = '<fetch>' +
        '<entity name="contractdetail" >' +
        '<attribute name="productid" />' +
        '<attribute name="uds_totalamountvatincluding" />' +
        '<attribute name="activeon" />' +
        '<attribute name="expireson" />' +
        '<attribute name="contractdetailid" />' +
        '<filter type="and" >' +
        '<condition attribute="uds_contractid" operator="eq" value="' + currentId + '" />' +
        '</filter>' +
        '<link-entity name="product" from="productid" to="productid" link-type="inner" >' +
        '<filter>' +
        '<condition attribute="producttypecode" operator="neq" value="6"/>' +
        '</filter>' +
        '</link-entity>' +
        '</entity>' +
        '</fetch>';

    objSubGrid.control.SetParameter("fetchXml", fetchXml);
    objSubGrid.control.Refresh();

};

IP.Contract.Form.InitializationGenerateBillingContractNotification = function () {
    Xrm.Page.ui.clearFormNotification('1');

    var contractsGenerationCode = Xrm.Page.getAttribute("uds_payergroupcontractsgenerationcode").getValue();
    var contractTypeAttr = Xrm.Page.getAttribute("uds_contracttypecode");
    var mainContractAttr = Xrm.Page.getAttribute("uds_cooperativelevelcontract");
    var errorDescription = Xrm.Page.getAttribute("uds_errordescription").getValue();
    var mainContractType = true;

    if ((contractTypeAttr.getValue() === IP.Contract.ContractTypeCode.RentContract ||
        contractTypeAttr.getValue() === IP.Contract.ContractTypeCode.MaintenanceContract ||
        contractTypeAttr.getValue() === IP.Contract.ContractTypeCode.BillingContract) &&
        mainContractAttr.getValue() === mainContractType) {
        if (contractsGenerationCode != null) {
            if (contractsGenerationCode === IP.Contract.PayerGroupContractsGenerationCode.Queued ||
                contractsGenerationCode === IP.Contract.PayerGroupContractsGenerationCode.UpdateQueued ||
                contractsGenerationCode === IP.Contract.PayerGroupContractsGenerationCode.UpdatePriceListQueued ||
                contractsGenerationCode === IP.Contract.PayerGroupContractsGenerationCode.Processing) {
                IP.Contract.WaitingGenerateBillingContract();
            }
            else if (errorDescription != null) {
                if (contractsGenerationCode === IP.Contract.PayerGroupContractsGenerationCode.Updated) {
                    IP.Contract.Form.ShowCompleteUpdatedPGContract();

                    var contractId = Xrm.Page.data.entity.getId();
                    IP.Contract.Data.ClearContractErrorDescription(contractId);
                }
                else if (contractsGenerationCode == IP.Contract.PayerGroupContractsGenerationCode.Error) {
                    IP.Contract.Form.ShowErrorMessagePGContract();
                }
            }
        }
    }
};

IP.Contract.Form.InitializationGenerateLOTIInvoicesNotification = function () {
    Xrm.Page.ui.clearFormNotification('1');

    var contractsGenerationCode = Xrm.Page.getAttribute("uds_payergroupcontractsgenerationcode").getValue();
    var contractTypeAttr = Xrm.Page.getAttribute("uds_contracttypecode");
    var errorDescription = Xrm.Page.getAttribute("uds_errordescription").getValue();

    if (contractTypeAttr.getValue() === IP.Contract.ContractTypeCode.LoanContract) {
        if (contractsGenerationCode != null) {
            if (contractsGenerationCode === IP.Contract.PayerGroupContractsGenerationCode.Queued ||
                contractsGenerationCode === IP.Contract.PayerGroupContractsGenerationCode.Processing) {
                IP.Contract.WaitingGenerateLOTIInvoices();
            }
        }
    }
};

IP.Contract.Form.ShowErrorMessagePGContract = function () {
    var errorDescription = Xrm.Page.getAttribute("uds_errordescription").getValue();
    var lastUpdatedOn = Xrm.Page.getAttribute("uds_lastupdatedon").getValue();
    lastUpdatedOn = (lastUpdatedOn != null) ? lastUpdatedOn.format("d.M.yyyy hh:mm") : "";

    Xrm.Page.ui.clearFormNotification('1');

    Xrm.Page.ui.setFormNotification(
        String.format(IP.Contract.Localization.GetLocalizedString('MessageGegenarationBillingContractsError'), lastUpdatedOn),
        'WARNING', '1');
};

IP.Contract.Form.ShowCompleteUpdatedPGContract = function () {
    Xrm.Page.ui.clearFormNotification('1');

    var lastUpdatedOn = Xrm.Page.getAttribute("uds_lastupdatedon").getValue();
    lastUpdatedOn = (lastUpdatedOn != null) ? lastUpdatedOn.format("d.M.yyyy hh:mm") : "";

    Xrm.Page.ui.setFormNotification(
        String.format(IP.Contract.Localization.GetLocalizedString('MessageGegenarationBillingContractsUpdated'), lastUpdatedOn),
        'WARNING', '1');
};

var lotiWaitingGeneration = false;
IP.Contract.WaitingGenerateLOTIInvoices = function () {
    var contractId = Xrm.Page.data.entity.getId();
    var contract = this.GetContractById(contractId);
    var userLcid = Xrm.Page.context.getUserLcid();
    var notificationMessage = "";

    //Xrm.Page.ui.clearFormNotification('1');

    if (contract != null && contract.uds_payergroupcontractsgenerationcode != null) {
        if (contract.uds_payergroupcontractsgenerationcode.Value === IP.Contract.PayerGroupContractsGenerationCode.Queued ||
            contract.uds_payergroupcontractsgenerationcode.Value === IP.Contract.PayerGroupContractsGenerationCode.Processing) {
            lotiWaitingGeneration = true;

            if (contract.uds_payergroupcontractsgenerationcode.Value === IP.Contract.PayerGroupContractsGenerationCode.Queued) {
                notificationMessage = IP.Contract.Localization.GetLocalizedString('MessageGenerationInvoicesInQueue');
            }
            else if (contract.uds_payergroupcontractsgenerationcode.Value === IP.Contract.PayerGroupContractsGenerationCode.Processing) {
                notificationMessage = IP.Contract.Localization.GetLocalizedString('MessageGenerationInvoicesInProcessing');
            }

            Xrm.Page.ui.setFormNotification(notificationMessage, 'WARNING', '1');

            setTimeout(function () {
                IP.Contract.Form.InitializationGenerateLOTIInvoicesNotification();
            }, 15000);
            return;
        }

        if (contract.uds_payergroupcontractsgenerationcode.Value == IP.Contract.PayerGroupContractsGenerationCode.Generated && lotiWaitingGeneration) {
            Xrm.Page.ui.setFormNotification(
                IP.Contract.Localization.GetLocalizedString('MessageGenerationInvoicesCompleted'), 'WARNING', '2');

            setTimeout(function () {
                Xrm.Utility.openEntityForm("contract", Xrm.Page.data.entity.getId());
            }, 2000);
        }
    }
};

var waitingGeneration = false;
IP.Contract.WaitingGenerateBillingContract = function () {
    var contractId = Xrm.Page.data.entity.getId();
    var contract = this.GetContractById(contractId);
    var userLcid = Xrm.Page.context.getUserLcid();
    var notificationMessage = "";

    //Xrm.Page.ui.clearFormNotification('1');

    if (contract != null && contract.uds_payergroupcontractsgenerationcode != null) {
        if (contract.uds_payergroupcontractsgenerationcode.Value === IP.Contract.PayerGroupContractsGenerationCode.Queued ||
            contract.uds_payergroupcontractsgenerationcode.Value === IP.Contract.PayerGroupContractsGenerationCode.UpdateQueued ||
            contract.uds_payergroupcontractsgenerationcode.Value === IP.Contract.PayerGroupContractsGenerationCode.UpdatePriceListQueued ||
            contract.uds_payergroupcontractsgenerationcode.Value === IP.Contract.PayerGroupContractsGenerationCode.Processing) {
            waitingGeneration = true;

            if (contract.uds_payergroupcontractsgenerationcode.Value === IP.Contract.PayerGroupContractsGenerationCode.Queued) {
                notificationMessage = IP.Contract.Localization.GetLocalizedString('MessageGegenarationBillingContractsInQueue');
            }
            else if (contract.uds_payergroupcontractsgenerationcode.Value === IP.Contract.PayerGroupContractsGenerationCode.UpdateQueued) {
                notificationMessage = IP.Contract.Localization.GetLocalizedString('MessageUpdateBillingContractsInQueue');
            }
            else if (contract.uds_payergroupcontractsgenerationcode.Value === IP.Contract.PayerGroupContractsGenerationCode.UpdatePriceListQueued) {
                notificationMessage = IP.Contract.Localization.GetLocalizedString('MessageUpdatePriceListContractsInQueue');
            }
            else if (contract.uds_payergroupcontractsgenerationcode.Value === IP.Contract.PayerGroupContractsGenerationCode.Processing) {
                notificationMessage = IP.Contract.Localization.GetLocalizedString('MessageGegenarationBillingContractsInProcessing');
            }

            Xrm.Page.ui.setFormNotification(notificationMessage, 'WARNING', '1');

            setTimeout(function () {
                //IP.Contract.WaitingGenerateBillingContract();
                IP.Contract.Form.InitializationGenerateBillingContractNotification();
            }, 15000);
            return;
        }

        if (contract.uds_payergroupcontractsgenerationcode.Value === IP.Contract.PayerGroupContractsGenerationCode.Generated && waitingGeneration) {
            Xrm.Page.ui.setFormNotification(
                IP.Contract.Localization.GetLocalizedString('MessageGegenarationBillingContractsGenerated'), 'WARNING', '2');
        }
    }
};

IP.Contract.WaitingLoanCalculation = function (contractId) {
    var contract = this.GetContractById(contractId);

    if (contract.uds_recalculatecontract) {
        setTimeout(function () {
            IP.Contract.WaitingLoanCalculation(contractId);
        }, 30000);
        return;
    }

    var userLcid = Xrm.Page.context.getUserLcid();
    var completeMessage = (userLcid === "1035") ? " Laskenta on valmis. Lataa sivu uudestaan sopimustietojen päivittämiseksi." :
        " Calculation is completed. Refresh the page to update the contract data.";

    Xrm.Page.ui.clearFormNotification('1');

    Xrm.Page.ui.setFormNotification(completeMessage, 'WARNING', '2');


    var clearCompleteNotification = function () {
        Xrm.Page.ui.clearFormNotification('2');
    };

    setTimeout(clearCompleteNotification, 10000);
};

IP.Contract.Ribbon.RecalculateLoan = function (contractId) {
    var contract = new XrmServiceToolkit.Soap.BusinessEntity("contract", contractId);
    contract.attributes['uds_recalculatecontract'] = true;
    XrmServiceToolkit.Soap.Update(contract);

    //IP.Contract.Ribbon.RecalculatingLoanWarning();
    //IP.Contract.CalculateDebtAction();
    Xrm.Page.data.save().then(IP.Contract.CalculateDebtAction);

    //setTimeout(function () {
    //  IP.Contract.WaitingLoanCalculation(contractId);
    //}, 5000);
};

IP.Contract.CalculateDebtAction = function () {
    var entityId = Xrm.Page.data.entity.getId();
    var entityName = 'contract';
    var requestName = "uds_debtcalculationforcontract";

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
        var userLcid = Xrm.Page.context.getUserLcid();

        var clearSecondNotification = function () {
            Xrm.Page.ui.clearFormNotification('2');
        };

        var loadingMessage = (userLcid === "1035") ? " Suoritetaan laskenta ..." : " Calculating ...";
        Xrm.Page.ui.setFormNotification(loadingMessage, 'WARNING', '1');

        UDS.ActionExecutor.Execute(
            {
                requestXml: requestXML,
                async: true,
                successCallback: function (data) {
                    var completeMessage = (userLcid == "1035") ? " Laskenta on valmis. Lataa sivu uudestaan sopimustietojen päivittämiseksi." :
                        " Calculation is completed. Refresh the page to update the contract data.";
                    if (data != null && data.OutputParameters != null) {

                        if (data.OutputParameters.ErrorCode != null && data.OutputParameters.ErrorCode != 0) {
                            switch (data.OutputParameters.ErrorCode) {
                                case 100:
                                    completeMessage = IP.Contract.Localization.GetLocalizedString("MessageErrorClosedPeriod");
                                    break;
                                case 101:
                                    completeMessage = IP.Contract.Localization.GetLocalizedString("MessageErrorCurrentMonthSet");
                                    break;
                                case 102:
                                    completeMessage = IP.Contract.Localization.GetLocalizedString("MessageErrorFiscalYearNotFound");
                                    break;
                                case 103:
                                    completeMessage = IP.Contract.Localization.GetLocalizedString("MessageErrorCalculationAlreadyRunning");
                                    break;
                                default:
                                    completeMessage = data.OutputParameters.Error ? data.OutputParameters.Error : "Error!";
                                    break;
                            }
                        }
                        if (data.OutputParameters && data.OutputParameters.WarningInvoices && data.OutputParameters.WarningInvoices.length > 0)
                        {
                            var description = IP.Contract.Localization.GetLocalizedString("TitleInvocesWarning");
                            //IP.Contract.Data.ShowWarningWindow(function () { }, "", description, 650, 250);
                        }
                    }

                    else setTimeout(clearSecondNotification, 12000);

                    IP.Contract.Form.SetSubgridsFilters();
                    Xrm.Page.data.refresh();

                    Xrm.Page.ui.clearFormNotification('1');
                    Xrm.Page.ui.setFormNotification(completeMessage, 'WARNING', '2');

                    var wrControl = Xrm.Page.ui.controls.get("WebResource_AcceptLoanContract");
                    if (wrControl) wrControl.setSrc(wrControl.getSrc());

                },
                errorCallback: function (error) {
                    var errorMessage = "";
                    if (error.message)
                        errorMessage = error.message + "\n";

                    errorMessage += (userLcid === 1035) ? "Kokeile laskea uudelleen tai ota yhteyttä tukeen, jos virhe toistuu." :
                        " Recalculation error. Try recalculate once more or contact support if this message still occur.";

                    Xrm.Page.ui.clearFormNotification('1');
                    Xrm.Page.ui.setFormNotification(errorMessage, 'WARNING', '2');
                    setTimeout(clearSecondNotification, 10000);
                }
            });
    }
    catch (e) {
        alert(e.message);
    }
};

IP.Contract.Ribbon.RecalculatingLoanWarning = function () {
    var recalculate = Xrm.Page.getAttribute("uds_recalculatecontract");
    if (recalculate) {
        var userLcid = Xrm.Page.context.getUserLcid();
        var loadingMessage = (userLcid === "1035") ? " Suoritetaan laskenta ..." : " Calculating ...";

        Xrm.Page.ui.setFormNotification(loadingMessage, 'WARNING', '1');
    }
};

IP.Contract.Ribbon.IsLoanContractEnableRule = function (contractId) {
    var contract = IP.Contract.GetContractByContractId(contractId);

    if (contract != null && contract.uds_ContractTypeId != null &&
        contract.uds_ContractTypeId.Name.toLowerCase() === "loan contract") {
        return true;
    }

    return false;
};

IP.Contract.Ribbon.IsBillingContractEnableRule = function (contractId) {
    var contract = IP.Contract.GetContractByContractId(contractId);

    if (contract != null && contract.uds_ContractTypeId != null &&
        contract.uds_ContractTypeId.Name.toLowerCase() === "billing contract") {
        return true;
    }

    return false;
};

IP.Contract.Ribbon.IsBillingOrRentContractEnableRule = function (contractId) {
    var contract = IP.Contract.GetContractByContractId(contractId);

    if (contract != null && contract.uds_contracttypecode != null &&
        (contract.uds_contracttypecode.Value === IP.Contract.ContractTypeCode.BillingContract ||
            contract.uds_contracttypecode.Value === IP.Contract.ContractTypeCode.RentContract ||
            (contract.uds_contracttypecode.Value === IP.Contract.ContractTypeCode.MaintenanceContract &&
                contract.uds_sourcedatatypecode != null && contract.uds_sourcedatatypecode.Value == IP.Contract.SourceDataTypeCode.Cooperatives))) {
        return true;
    }

    return false;
};

IP.Contract.Ribbon.IsContainsChildBillingContracts = function (contractId) {
    return IP.Contract.IsContainsChildContracts(contractId);
};

IP.Contract.ExecuteCreateInvoiceGenerationAction = function () {
    let entityId = Xrm.Page.data.entity.getId();
    let entityName = 'contract';
    let requestName = "uds_CreateInvoiceGenerationFromContract";

    let requestXML = "<s:Envelope xmlns:s=\"http://schemas.xmlsoap.org/soap/envelope/\">\
                        <s:Body>\
                          <Execute xmlns=\"http://schemas.microsoft.com/xrm/2011/Contracts/Services\" xmlns:i=\"http://www.w3.org/2001/XMLSchema-instance\">\
                            <request xmlns:a=\"http://schemas.microsoft.com/xrm/2011/Contracts\">\
                              <a:Parameters xmlns:b=\"http://schemas.datacontract.org/2004/07/System.Collections.Generic\">\
                                <a:KeyValuePairOfstringanyType>\
                                  <b:key>Target</b:key>\
                                  <b:value i:type=\"a:EntityReference\">\
                                    <a:Id>" + entityId + "</a:Id>\
                                    <a:LogicalName>" + entityName + "</a:LogicalName>\
                                    <a:Name i:nil=\"true\" />\
                                  </b:value>\
                                </a:KeyValuePairOfstringanyType>\
                              </a:Parameters>\
                              <a:RequestId i:nil=\"true\" />\
                              <a:RequestName>" + requestName + "</a:RequestName>\
                            </request>\
                          </Execute>\
                        </s:Body>\
                      </s:Envelope>";

    try {
        let result = UDS.ActionExecutor.Execute(
            {
                requestXml: requestXML,
                async: false,
                successCallback: null,
                errorCallback: null
            });

        if (result.name === "Error") {
            alert(result.message);
            return false;
        }
        else if (result.InvoiceGenerationId != null) {
            Xrm.Utility.openEntityForm("uds_invoicegeneration", result.InvoiceGenerationId);
        }
    }
    catch (e) {
        alert(e.message);
        return false;
    }
};

IP.Contract.Data.ExecuteDataTransferAction = function (messageType, jsonObject) {
    let requestName = 'uds_EditContractLine';
    let languageCode = Xrm.Page.context.getUserLcid();

    let requestXML = "<s:Envelope xmlns:s=\"http://schemas.xmlsoap.org/soap/envelope/\">\
                            <s:Body>\
                              <Execute xmlns=\"http://schemas.microsoft.com/xrm/2011/Contracts/Services\" xmlns:i=\"http://www.w3.org/2001/XMLSchema-instance\">\
                                <request xmlns:a=\"http://schemas.microsoft.com/xrm/2011/Contracts\">\
                                  <a:Parameters xmlns:b=\"http://schemas.datacontract.org/2004/07/System.Collections.Generic\">\
                                    <a:KeyValuePairOfstringanyType>\
                                      <b:key>LanguageCode</b:key>\
                                      <b:value i:type='c:int' xmlns:c='http://www.w3.org/2001/XMLSchema'>" + languageCode + "</b:value>\
                                    </a:KeyValuePairOfstringanyType>\
                                    <a:KeyValuePairOfstringanyType>\
                                      <b:key>MessageType</b:key>\
                                      <b:value i:type='c:int' xmlns:c='http://www.w3.org/2001/XMLSchema'>" + messageType + "</b:value>\
                                    </a:KeyValuePairOfstringanyType>\
                                    <a:KeyValuePairOfstringanyType>\
                                      <b:key>JsonObject</b:key>\
                                      <b:value i:type='c:string' xmlns:c='http://www.w3.org/2001/XMLSchema'>" + encodeURIComponent(jsonObject) + "</b:value>\
                                    </a:KeyValuePairOfstringanyType>\
                                  </a:Parameters>\
                                  <a:RequestId i:nil=\"true\" />\
                                  <a:RequestName>" + requestName + "</a:RequestName>\
                                </request>\
                              </Execute>\
                            </s:Body>\
                          </s:Envelope>";

    try {
        let result = UDS.ActionExecutor.Execute(
            {
                requestXml: requestXML,
                async: false,
                successCallback: null,
                errorCallback: null
            });

        if (result.name === "Error") {
            alert(result.message);
        }
        else if (result.OutJsonObject != null) {
            return result.OutJsonObject;
        }
    }
    catch (e) {
        alert(e.message);
    }

    return null;
}

IP.Contract.Data.ExecuteContractDataTransferAction = function (messageType, jsonObject) {
    let requestName = 'uds_ContractDataTransfer';
    let languageCode = Xrm.Page.context.getUserLcid();

    let requestXML = "<s:Envelope xmlns:s=\"http://schemas.xmlsoap.org/soap/envelope/\">\
                            <s:Body>\
                              <Execute xmlns=\"http://schemas.microsoft.com/xrm/2011/Contracts/Services\" xmlns:i=\"http://www.w3.org/2001/XMLSchema-instance\">\
                                <request xmlns:a=\"http://schemas.microsoft.com/xrm/2011/Contracts\">\
                                  <a:Parameters xmlns:b=\"http://schemas.datacontract.org/2004/07/System.Collections.Generic\">\
                                    <a:KeyValuePairOfstringanyType>\
                                      <b:key>LanguageCode</b:key>\
                                      <b:value i:type='c:int' xmlns:c='http://www.w3.org/2001/XMLSchema'>" + languageCode + "</b:value>\
                                    </a:KeyValuePairOfstringanyType>\
                                    <a:KeyValuePairOfstringanyType>\
                                      <b:key>MessageType</b:key>\
                                      <b:value i:type='c:int' xmlns:c='http://www.w3.org/2001/XMLSchema'>" + messageType + "</b:value>\
                                    </a:KeyValuePairOfstringanyType>\
                                    <a:KeyValuePairOfstringanyType>\
                                      <b:key>JsonObject</b:key>\
                                      <b:value i:type='c:string' xmlns:c='http://www.w3.org/2001/XMLSchema'>" + encodeURIComponent(jsonObject) + "</b:value>\
                                    </a:KeyValuePairOfstringanyType>\
                                  </a:Parameters>\
                                  <a:RequestId i:nil=\"true\" />\
                                  <a:RequestName>" + requestName + "</a:RequestName>\
                                </request>\
                              </Execute>\
                            </s:Body>\
                          </s:Envelope>";

    try {
        let result = UDS.ActionExecutor.Execute(
            {
                requestXml: requestXML,
                async: false,
                successCallback: null,
                errorCallback: null
            });

        if (result.name === "Error") {
            alert(result.message);
        }
        else if (result.OutJsonObject != null) {
            return result.OutJsonObject;
        }
    }
    catch (e) {
        alert(e.message);
    }

    return null;
}


IP.Contract.Data.ExecuteDataTransferActionAsyncMode = function (messageType, jsonObject, languageCode) {
    this.IsErrorRequest = false;
    let requestName = 'uds_EditContractLine';

    languageCode = (languageCode == null) ? Xrm.Page.context.getUserLcid() : languageCode;
  
    var requestXML = "<s:Envelope xmlns:s=\"http://schemas.xmlsoap.org/soap/envelope/\">\
                            <s:Body>\
                              <Execute xmlns=\"http://schemas.microsoft.com/xrm/2011/Contracts/Services\" xmlns:i=\"http://www.w3.org/2001/XMLSchema-instance\">\
                                <request xmlns:a=\"http://schemas.microsoft.com/xrm/2011/Contracts\">\
                                  <a:Parameters xmlns:b=\"http://schemas.datacontract.org/2004/07/System.Collections.Generic\">\
                                    <a:KeyValuePairOfstringanyType>\
                                      <b:key>LanguageCode</b:key>\
                                      <b:value i:type='c:int' xmlns:c='http://www.w3.org/2001/XMLSchema'>" + languageCode + "</b:value>\
                                    </a:KeyValuePairOfstringanyType>\
                                    <a:KeyValuePairOfstringanyType>\
                                      <b:key>MessageType</b:key>\
                                      <b:value i:type='c:int' xmlns:c='http://www.w3.org/2001/XMLSchema'>" + messageType + "</b:value>\
                                    </a:KeyValuePairOfstringanyType>\
                                    <a:KeyValuePairOfstringanyType>\
                                      <b:key>JsonObject</b:key>\
                                      <b:value i:type='c:string' xmlns:c='http://www.w3.org/2001/XMLSchema'>" + jsonObject + "</b:value>\
                                    </a:KeyValuePairOfstringanyType>\
                                  </a:Parameters>\
                                  <a:RequestId i:nil=\"true\" />\
                                  <a:RequestName>" + requestName + "</a:RequestName>\
                                </request>\
                              </Execute>\
                            </s:Body>\
                          </s:Envelope>";

    var $deferred = $.Deferred();
    try {
        var result = UDS.ActionExecutor.Execute(
            {
                requestXml: requestXML,
                async: true,
                successCallback: function (result) {
                    if (result && result.OutJsonObject) {
                        $deferred.resolve(result);
                    }
                },
                errorCallback: function (error) {
                    var errorMessage = IP.Contract.Data.GetErrorMessage(error.message);

                    var result = {
                        IsSuccess: false,
                        message: errorMessage
                    };

                    $deferred.resolve(result);
                }
            });
    }
    catch (e) {
        alert(IP.Contract.Data.GetErrorMessage(e.message));
    }

    return $deferred.promise();
};

IP.Contract.Data.ExecuteDataTransferActionAsync = function (messageType, json, message, calbackFunction) {
    UDS.WorkDialog.Show(function () {
        var $deferred = $.Deferred();

        var clearEditToolError = function () {
            Xrm.Page.ui.clearFormNotification('errorEditToolAsync');
        };

        $deferred.notify(message);
        IP.Contract.Data.ExecuteDataTransferActionAsyncMode(messageType, json)
            .done(function (response) {
                if (response.IsSuccess) {
                    calbackFunction(response.OutJsonObject);
                    $deferred.resolve();
                }
                else {
                    Xrm.Page.ui.clearFormNotification('1');
                    Xrm.Page.ui.clearFormNotification('errorEditToolAsync');
                    Xrm.Page.ui.setFormNotification(response.message, 'WARNING', 'errorEditToolAsync');
                    setTimeout(clearEditToolError, 10000);

                    $deferred.resolve();
                }
            })
            .fail(function (error) {
                Xrm.Page.ui.clearFormNotification('1');
                Xrm.Page.ui.clearFormNotification('errorEditToolAsync');
                Xrm.Page.ui.setFormNotification(error.message, 'WARNING', 'errorEditToolAsync');
                setTimeout(clearEditToolError, 10000);

                $deferred.resolve();
            });

        return $deferred;
    });
};


IP.Contract.Data.GetErrorMessage = function (errorMessage) {
    var separator = /\s*:::\s*/
    var errors = errorMessage.split(separator);


    return errors[0];
},


    IP.Contract.Ribbon.CreateAutomaticBillingContracts = function (contractId) {
        // Check exist billing contract
        if (IP.Contract.Form.CheckContractErrors(contractId)) {
            IP.Contract.Form.InitializationGenerateBillingContractNotification();

            setTimeout(function () {
                var json = {
                    ContractId: contractId,
                    DefaultMainPageRecords: 20
                };

                if (IP.Contract.Data.IsExistInvoicesForDelete(json) == false) {
                    // Run update payer group contracts
                    var resultFunction = function (result) {
                        window.location = window.location;
                    };

                    var loadingMessage = IP.Contract.Localization.GetLocalizedString('Loading');
                    var result = IP.Contract.Data.ExecuteDataTransferActionAsync(IP.Contract.TransferMessageType.SynchronizePayerGroupContracts, JSON.stringify(json), loadingMessage, resultFunction);

                    if (IP.Contract.Data.IsErrorRequest) {
                        alert(result);
                        return;
                    }
                }
            }, 1000);
        }
    };

IP.Contract.Data.IsExistInvoicesForDelete = function (json) {
    var data = IP.Contract.Data.ExecuteDataTransferAction(IP.Contract.TransferMessageType.CheckInvoicesForDelete, JSON.stringify(json));

    if (IP.Contract.Data.IsErrorRequest) {
        IP.Contract.Data.ShowWarningNotify(data);
        return;
    }

    if (data.IsContainsInvoicesForDelete === true) {
        IP.Contract.Data.ShowDeleteInvoicesConfirmationWindow(data,
            function (data) {
                //IP.AddContractLines.Form.RunSynchronizePayerGroupContracts();
            },
            function (data) {
                Mscrm.Utilities.setReturnValue(false);
                closeWindow(true);
            }
        );
    }
    else {
        return false;
    }

    return true;
};

IP.Contract.Data.ShowDeleteInvoicesConfirmationWindow = function (result, successCalback, cancelCalback) {
    var description = IP.Contract.Localization.GetLocalizedString("ConfirmDeleteInvoicesTableTitle");
    var confirmationTitle = IP.Contract.Localization.GetLocalizedString("ConfirmationWindowTitle");
    var prependOrgName = Xrm.Page.context.prependOrgName("/");

    for (var i = 0; i < result.Invoices.length; i++) {
        var invoice = result.Invoices[i];
        description += "<tr>";
        description += "<td><a target='_blank' href='" + prependOrgName + "main.aspx?etn=invoice&id={" +
            invoice.InvoiceId + "}&pagetype=entityrecord'>" + invoice.InvoiceNumber + "</a></td>";

        description += "<td>" + invoice.PayerNames + "</td>";
        description += "<td>" + invoice.Spaces + "</td>";
        description += "<td>" + invoice.InvoiceDateStr + "</td>";
        description += "<td style='text-align: right;'>" + IP.Contract.Data.Get2FormatedValue(invoice.AmountVatIncluding) + "</td>";
        description += "</tr>";
    }
    description += "</table>";

    IP.Contract.Data.ShowConfirmationWindow(successCalback, cancelCalback, confirmationTitle, description, result, 780, 400);
},

    IP.Contract.Data.ShowConfirmationWindow = function (successCalback, cancelCalback, text, description, data, width, height) {
        Alert.show(text, description,
            [
                new Alert.Button(
                    IP.Contract.Localization.GetLocalizedString('TitleOkButton'),
                    successCalback, data),
                new Alert.Button(
                    IP.Contract.Localization.GetLocalizedString('TitleCancelButton'),
                    cancelCalback, data)
            ], "QUESTION", width, height);
    },
    
    IP.Contract.Data.ShowWarningWindow = function (successCalback, text, description, width, height) {
        Alert.show(text, description,
            [
                new Alert.Button(
                    IP.Contract.Localization.GetLocalizedString('TitleOkButton'),
                    successCalback, null),
            ], "WARNING", width, height);
    },



    IP.Contract.Data.Get2FormatedValue = function (value) {
        value = (value == null) ? 0 : value;

        if (/\d+[\.\,]\d\d/i.test((value + '').toString())) {
            return (value + '').toString().replace('.', ',');
        }

        if (/\d+[\.\,]\d/i.test((value + '').toString())) {
            return (value + '').toString().replace('.', ',') + '0';
        }

        return (value + '').toString() + ',00';
    };

IP.Contract.GetConnectionRoleByName = function (name) {
    var roleQuery = new UDS.Query.QueryBuilder("ConnectionRole")
        .Select("ConnectionRoleId")
        .Filter("and")
        .Condition("Name", "eq", name, "String");
    var role = new UDS.Query.QueryExecutor(roleQuery).RetrieveMultiple();

    if (role != null && role.length > 0) {
        return role[0].ConnectionRoleId;
    }
    return null;
}

IP.Contract.GetCustomConnectionRoleByName = function (name) {
    var roleQuery = new UDS.Query.QueryBuilder("uds_connectionrole")
        .Select("uds_connectionroleId")
        .Filter("and")
        .Condition("uds_name", "eq", name, "String");
    var role = new UDS.Query.QueryExecutor(roleQuery).RetrieveMultiple();

    if (role != null && role.length > 0) {
        return role[0].uds_connectionroleId;
    }
    return null;
}

IP.Contract.GetConnectionByRoleIdAndPayerGroup = function (customRoleId, payerGroupId) {
    var connectionQuery = new UDS.Query.QueryBuilder("uds_contractconnection")
        .Select("uds_organizationid", "uds_personid")
        .Filter("and")
        .Condition("uds_payergroupid", "eq", payerGroupId, "Lookup")
        .Condition("uds_connectionroleid", "eq", customRoleId, "Lookup");
    var connection = new UDS.Query.QueryExecutor(connectionQuery).RetrieveMultiple();

    if (connection != null && connection.length > 0) {
        return (connection[0].uds_organizationid.Id || connection[0].uds_personid.Id);
    }

    return null;
}

IP.Contract.Data.IsAllowEditBRC = function (isCooperativeLevelContract, contractId) {
    if (!isCooperativeLevelContract) {
        return false;
    }

    var contractQuery = new UDS.Query.QueryBuilder("Contract")
        .Select("ContractId")
        .Filter("and")
        .Condition("uds_primarycontractid", "eq", contractId, "Lookup");

    var contracts = new UDS.Query.QueryExecutor(contractQuery).RetrieveMultiple();

    if (contracts != null && contracts.length > 0) {
        return false;
    }

    return true;
}

IP.Contract.SetOwnerConnection = function (owners) {
    if (owners.length == 0)
        return;

    var contractId = Xrm.Page.data.entity.getId();
    var payerGroupId = Xrm.Page.getAttribute("uds_sellergroupid").getValue()
        && Xrm.Page.getAttribute("uds_sellergroupid").getValue()[0].id;

    if (!contractId || !payerGroupId)
        return;

    var customLaskuttajaId = IP.Contract.GetCustomConnectionRoleByName("Laskuttaja");
    var customMyyjäId = IP.Contract.GetCustomConnectionRoleByName("Myyjä");

    var connFetchXml = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false' >" +
        "  <entity name='uds_contractconnection' >" +
        "    <attribute name='uds_name' />" +
        "    <attribute name='uds_organizationid' />" +
        "    <attribute name='uds_personid' />" +
        "    <order attribute='name' descending='false' />" +
        "    <filter type='and' >" +
        "      <filter type='and' >" +
        "        <condition attribute='statecode' operator='eq' value='0' />" +
        "        <condition attribute='uds_payergroupid' operator='eq' value='" + payerGroupId + "' />" +
        "        <filter type='or' >" +
        "          <condition attribute='uds_connectionroleid' operator='eq' value='" + customLaskuttajaId + "' />" +
        "          <condition attribute='uds_connectionroleid' operator='eq' value='" + customMyyjäId + "' />" +
        "        </filter>" +
        "      </filter>" +
        "    </filter>" +
        "  </entity>" +
        "</fetch>";

    var connections = XrmServiceToolkit.Soap.Fetch(connFetchXml);

    var sellerId = owners[0].attributes["record2id"].id.toLowerCase();
    sellerId = sellerId.replace("{", "");
    sellerId = sellerId.replace("}", "");

    if (connections.length > 0) {
        for (var i = 0; i < connections.length; i++) {
            XrmServiceToolkit.Rest.Delete(connections[i].id, "uds_contractconnection",
                function () { },
                function (error) { },
                false);
        }
    }

    IP.Contract.CreateContractConnection(
        payerGroupId,
        owners[0].attributes["record2id"].logicalName,
        sellerId,
        customLaskuttajaId);

    for (var i = 1; i < owners.length; i++) {
        IP.Contract.CreateContractConnection(
            payerGroupId,
            owners[i].attributes["record2id"].logicalName,
            owners[i].attributes["record2id"].id,
            customMyyjäId);
    }

    Xrm.Page.getControl("SELLERS_GRID").refresh();
};

IP.Contract.CreateConnection = function (fromEntityType, fromId, toEntityType, toId, toRoleId) {
    if (fromEntityType && fromId && toEntityType && toId && toRoleId) {
        var newConnection = new XrmServiceToolkit.Soap.BusinessEntity("connection");
        var deliveryAdress = IP.Contract.GetContactInformation(toId, toEntityType);
        newConnection.attributes["record1id"] = { id: fromId, logicalName: fromEntityType, type: "EntityReference" }
        newConnection.attributes["record2id"] = { id: toId, logicalName: toEntityType, type: "EntityReference" }
        newConnection.attributes["record2roleid"] = { id: toRoleId, logicalName: "connectionrole", type: "EntityReference" }
        if (deliveryAdress != null)
            newConnection.attributes["uds_invoicepayeraddressid"] = { id: deliveryAdress.id, logicalName: "uds_contactinformation", type: "EntityReference" }
        XrmServiceToolkit.Soap.Create(newConnection);
    }
};

IP.Contract.CreateContractConnection = function (fromId, toEntityType, toId, toRoleId) {
    if (toEntityType && fromId && toEntityType && toId && toRoleId) {
        var newConnection = new XrmServiceToolkit.Soap.BusinessEntity("connection");
        var deliveryAdress = IP.Contract.GetContactInformation(toId, toEntityType);
        newConnection.attributes["record1id"] = { id: fromId, logicalName: fromEntityType, type: "EntityReference" }
        newConnection.attributes["record2id"] = { id: toId, logicalName: toEntityType, type: "EntityReference" }
        newConnection.attributes["record2roleid"] = { id: toRoleId, logicalName: "connectionrole", type: "EntityReference" }
        if (deliveryAdress != null)
            newConnection.attributes["uds_invoicepayeraddressid"] = { id: deliveryAdress.id, logicalName: "uds_contactinformation", type: "EntityReference" }
        XrmServiceToolkit.Soap.Create(newConnection);
    }
};

IP.Contract.GetContactInformation = function (sellerId, sellerType) {
    if (!sellerId && !sellerType)
        return null;

    var fetchXml = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>\
                        <entity name='uds_contactinformation'>\
                            <attribute name='uds_name' />\
                            <attribute name='uds_personid' />\
                            <attribute name='uds_organizationid' />\
                            <attribute name='uds_contacttypecode' />\
                            <order attribute='uds_name' descending='false' />\
                            <filter type='and'>";

    if (sellerType == "account") {
        fetchXml += "<condition attribute='uds_organizationid' operator='eq' value='" + sellerId + "' />";
    } else if (sellerType == "contact")
        fetchXml += "<condition attribute='uds_personid' operator='eq' value='" + sellerId + "' />";

    fetchXml += "</filter>\
                </entity>\
            </fetch>";

    var contactInfos = XrmServiceToolkit.Soap.Fetch(fetchXml);
    if (contactInfos && contactInfos.length > 0) {
        return contactInfos[0];
    }

    return null;
};

IP.Contract.SetPriceListByCooperative = function () {
    var cooperativeId = Xrm.Page.getAttribute("uds_cooperativeid").getValue();
    if (cooperativeId == null)
        return;

    var fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">\
                      <entity name="pricelevel">\
                        <attribute name="name" />\
                        <attribute name="uds_isdefaultprice" />\
                        <order attribute="name" descending="false" />\
                        <filter type="and">\
                            <condition attribute="uds_sellertype" operator="eq" value="0" />\
                            <condition attribute="uds_organizationid" operator="eq" value="' + cooperativeId[0].id + '" />\
                            <condition attribute="uds_isdefaultprice" operator="eq" value="1" />\
                        </filter>\
                      </entity>\
                    </fetch>';

    var defPriceLists = XrmServiceToolkit.Soap.Fetch(fetchXml);
    if (defPriceLists && defPriceLists.length > 0) {
        Xrm.Page.getAttribute("uds_pricelistid").setValue([{
            id: defPriceLists[0].id,
            name: defPriceLists[0].attributes["name"].value,
            entityType: "Pricelevel"
        }]);
    }
};

IP.Contract.SetInvoiceSubgridFilter = function () {
    var isMainContract = Xrm.Page.getAttribute("uds_cooperativelevelcontract").getValue();
    var contractTypeCode = Xrm.Page.getAttribute("uds_contracttypecode").getValue();

    if (isMainContract ||
        contractTypeCode == IP.Contract.ContractTypeCode.RentContract ||
        contractTypeCode == IP.Contract.ContractTypeCode.MaintenanceContract) {
        IP.Contract.Form.SetVisibleTabSection("tab_13", "INVOICES_GRID", false);
        IP.Contract.Form.SetVisibleTabSection("tab_13", "MAIN_CONTRACT_INVOICES", true);
    }
    else {
        IP.Contract.Form.SetVisibleTabSection("tab_13", "INVOICES_GRID", true);
        IP.Contract.Form.SetVisibleTabSection("tab_13", "MAIN_CONTRACT_INVOICES", false);
    }
};

var refreshCount = 0, maxRefresh = 2;

IP.Contract.SetInvoiceGenerationsSubgridFilter = function () {

    var objSubGrid = Xrm.Page.ui.controls.get("WebResource_InvoiceGenerationsCustomGrid");


    //var objSubGrid = document.getElementById("Invoice_generations");
    /*if (objSubGrid == null) {
        setTimeout(IP.Contract.SetInvoiceGenerationsSubgridFilter, 2000);
        return;
    }

    if (refreshCount < maxRefresh) {
        if (objSubGrid.control.GetParameter("fetchXml") != null) {
            objSubGrid.control.refresh();
            refreshCount++;
            setTimeout(IP.Contract.SetInvoiceGenerationsSubgridFilter, 2000);
            return;
        }
    }
    else if (refreshCount >= maxRefresh)
        return;
    */


    if (objSubGrid == null || objSubGrid.getObject == null || objSubGrid.getObject().contentWindow.IP == null) {
        setTimeout(IP.Contract.SetInvoiceGenerationsSubgridFilter, 2500);
        return;
    }

    var isMainContract = Xrm.Page.getAttribute("uds_cooperativelevelcontract").getValue();
    var currentId = Xrm.Page.data.entity.getId();

    var subgridFetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true" >\
                                <entity name="uds_invoicegeneration" >\
                                    <attribute name="uds_invoicegenerationid" />\
                                    <attribute name="uds_name" />\
                                    <attribute name="uds_invoicingperiod" />\
                                    <attribute name="uds_noofinvoices" />\
                                    <attribute name="createdon" />\
                                    <attribute name="uds_typecreation" />\
                                    <attribute name="uds_invoicetypecode" />\
                                    <attribute name="uds_invoicegenerationnumber" />\
                                    <attribute name="uds_invoicedate" />\
                                    <attribute name="uds_paymentduedate" />\
                                    <attribute name="uds_invoicegenerationstatuscode" />\
                                    <attribute name="uds_generategroupinvoice" />';


    var subgridFetchXml2 = subgridFetchXml;

    if (isMainContract === true) {
        subgridFetchXml += '<link-entity name="invoice" from="uds_invoicegenerationid" to="uds_invoicegenerationid" link-type="inner" >\
                                <filter type="and" >\
                                    <condition attribute="uds_maincontractid" operator="eq" value="' + currentId + '" />\
                                </filter>\
                            </link-entity>';

        subgridFetchXml2 += '<link-entity name="uds_groupinvoice" from="uds_invoicegenerationid" to="uds_invoicegenerationid" link-type="inner" >\
                                <filter type="and" >\
                                    <condition attribute="uds_maincontractid" operator="eq" value="' + currentId + '" />\
                                </filter>\
                            </link-entity>';
    } else {
        subgridFetchXml += '<link-entity name="invoice" from="uds_invoicegenerationid" to="uds_invoicegenerationid" link-type="inner" >\
                                <filter type="and" >\
                                    <condition attribute="uds_contractid" operator="eq" value="' + currentId + '" />\
                                </filter>\
                            </link-entity>';

        subgridFetchXml2 += '<link-entity name="uds_groupinvoice" from="uds_invoicegenerationid" to="uds_invoicegenerationid" link-type="inner" >\
                                <filter type="and" >\
                                    <condition attribute="uds_contractid" operator="eq" value="' + currentId + '" />\
                                </filter>\
                            </link-entity>';
    }

    //subgridFetchXml += '<link-entity name="uds_contract_uds_invoicegeneration" from="uds_invoicegenerationid" to="uds_invoicegenerationid" link-type="inner" intersect="true" >\
    //              <filter type="and" >\
    //              <condition attribute="contractid" operator="eq" value="' + currentId + '" />\
    //              </filter>\
    //          </link-entity>\
    //      </entity>\
    //  </fetch>';

    subgridFetchXml += '</entity></fetch>';
    subgridFetchXml2 += '</entity></fetch>';


    var data = {
        ParentEntityTypeCode: 1010,
        EntityTypeCode: UDS.GetEntityMetadata('uds_invoicegeneration').ObjectTypeCode,
        FetchXml: subgridFetchXml,
        FetchXml2: subgridFetchXml2,
        PrimaryRecordName: Xrm.Page.getAttribute("title").getValue(),
        FormType: Xrm.Page.ui.formSelector.getCurrentItem().getLabel(),
        CreatedOn: Xrm.Page.getAttribute("createdon").getValue(),
        Statecode: Xrm.Page.getAttribute("statecode").getSelectedOption().text,
        Ownerid: Xrm.Page.getAttribute("ownerid").getValue()[0],
        PrimaryEntityName: "Contract",
        ViewName: "InvoiceGenerations",
        IsView: false,
        CreateButton: false
    };

    //objSubGrid.getObject().contentDocument.getElementById("CreateNewRecordFromCurrent").style.display = "none";

    objSubGrid.setVisible(true);
    objSubGrid.getObject().contentWindow.IP.CustomView.Data.Parameters = data;

    /*
    objSubGrid.control.SetParameter("fetchXml", subgridFetchXml);
    objSubGrid.control.refresh();
    setTimeout(IP.Contract.SetInvoiceGenerationsSubgridFilter, 2000);
    */
}

IP.Contract.SetLiabilityContractSubgridFilter = function () {
    var objSubGrid = document.getElementById("LIABILITY_CONTRACTS");
    if (objSubGrid == null) {

        setTimeout(IP.Contract.SetLiabilityContractSubgridFilter, 2000);
        return;
    }
    var party1nameids = Xrm.Page.getAttribute("uds_party1nameids").getValue();
    var party2nameids = Xrm.Page.getAttribute("uds_party2nameids").getValue();

    var subgridFetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">\
                              <entity name="contract">\
                                <attribute name="title" />\
                                <attribute name="uds_partyrole2code" />\
                                <attribute name="uds_partyrole1code" />\
                                <attribute name="statecode" />\
                                <attribute name="activeon" />\
                                <attribute name="expireson" />\
                                <attribute name="uds_contractnumber" />\
                                <attribute name="createdon" />\
                                <attribute name="createdby" />\
                                <attribute name="uds_party1name" />\
                                <attribute name="uds_party2name" />\
                                <attribute name="uds_cooperativelevelcontract" />\
                                <attribute name="uds_contracttypecode" />\
                                <attribute name="uds_spaceslist" />\
                                <attribute name="contractid" />\
                                <order attribute="createdon" descending="true" />\
                                <filter type="and">\
                                  <condition attribute="uds_contracttypecode" operator="eq" value="752560001" />\
                                  <filter type="or">\
                                    <filter type="and">\
                                      <condition attribute="uds_party1nameids" operator="eq" value="'+ party1nameids + '" />\
                                      <condition attribute="uds_party2nameids" operator="eq" value="'+ party2nameids + '" />\
                                    </filter>\
                                    <filter type="and">\
                                      <condition attribute="uds_party1nameids" operator="eq" value="'+ party2nameids + '" />\
                                      <condition attribute="uds_party2nameids" operator="eq" value="'+ party1nameids + '" />\
                                    </filter>\
                                  </filter>\
                                </filter>\
                              </entity>\
                            </fetch>';

    objSubGrid.control.SetParameter("fetchXml", subgridFetchXml);
    objSubGrid.control.refresh();
}

IP.Contract.SetDeliveryListSubgridFilter = function () {
    var url = "/WebResources/uds_/CustomSubgrid/CustomSubgrid.html";
    var urlTest = "/WebResources/uds_/CustomView/CustomView.js";
    if (IP.Contract.Data.UrlExists(url) && IP.Contract.Data.UrlExists(urlTest)) {
        var isMainContract = Xrm.Page.getAttribute("uds_cooperativelevelcontract").getValue();
        if (!isMainContract)
            return;

        var objSubGrid = Xrm.Page.ui.controls.get("WebResource_deliverylist");
        if (objSubGrid == null || objSubGrid.getObject().contentWindow.IP == null) {
            setTimeout(IP.Contract.SetDeliveryListSubgridFilter, 2000);
            return;
        }

        var currentId = Xrm.Page.data.entity.getId();
        var subgridFetchXml = '<fetch version="1.0" distinct="true" >\
                                <entity name="connection" >\
                                    <attribute name="connectionid" />\
                                    <attribute name="uds_invoicepayeraddressid" />\
                                    <filter type="and" >\
                                        <condition attribute="uds_sendinvoice" operator="eq" value="1" />\
                                        <condition attribute="record2roleid" operator="eq" value="145C6E67-6A85-E411-8101-000D3A2021A6" />\
                                    </filter>\
                                    <link-entity name="invoice" from="invoiceid" to="record1id" link-type="inner" alias="i" >\
                                        <attribute name="uds_spaces" />\
                                        <attribute name="uds_invoicedate" />\
                                        <attribute name="uds_payerpartynames" />\
                                        <link-entity name="contract" from="contractid" to="uds_contractid" link-type="inner" alias="c" >\
                                            <attribute name="uds_contractnumber" />\
                                            <filter type="and" >\
                                                <condition attribute="uds_primarycontractid" operator="eq" value="' + currentId + '" />\
                                            </filter>\
                                        </link-entity>\
                                    </link-entity>\
                                </entity>\
                            </fetch>';

        var data = {
            EntityTypeCode: 3234,
            FetchXml: subgridFetchXml,
            PrimaryRecordName: Xrm.Page.getAttribute("title").getValue(),
            FormType: Xrm.Page.ui.formSelector.getCurrentItem().getLabel(),
            CreatedOn: Xrm.Page.getAttribute("createdon").getValue(),
            Statecode: Xrm.Page.getAttribute("statecode").getSelectedOption().text,
            Ownerid: Xrm.Page.getAttribute("ownerid").getValue()[0],
            PrimaryEntityName: "Contract",
            ViewName: "DeliveryList",
            IsView: false
        };

        objSubGrid.setVisible(true);
        objSubGrid.getObject().contentWindow.IP.CustomView.Data.Parameters = data;
    }
}

IP.Contract.SetContractLineGridForRentContract = function () {
    var url = "/WebResources/uds_/CustomSubgrid/CustomSubgrid.html";
    var urlTest = "/WebResources/uds_/CustomView/CustomView.js";
    if (IP.Contract.Data.UrlExists(url) && IP.Contract.Data.UrlExists(urlTest)) {
        var objSubGrid = Xrm.Page.ui.controls.get("WebResource_maintenanceContractLines");
        if (objSubGrid == null || objSubGrid.getObject().contentWindow.IP == null) {
            setTimeout(IP.Contract.SetContractLineGridForRentContract, 2000);
            return;
        }


        var currentId = Xrm.Page.data.entity.getId();
        var fetchXml = '<fetch>' +
            '<entity name="contractdetail" >' +
            '<attribute name="productid" />' +
            '<attribute name="uds_totalamountvatincluding" />' +
            '<attribute name="activeon" />' +
            '<attribute name="expireson" />' +
            '<attribute name="uds_functionaltypecode" />' +
            '<attribute name="uds_statuslpcode" />' +
            '<attribute name="contractdetailid" />' +
            '<filter type="and" >' +
            '<condition attribute="uds_contractid" operator="eq" value="' + currentId + '" />' +
            '</filter>' +
            '<link-entity name="product" from="productid" to="productid" link-type="inner" >' +
            '<filter>' +
            '<condition attribute="producttypecode" operator="eq" value="6"/>' +
            '</filter>' +
            '</link-entity>' +
            '</entity>' +
            '</fetch>';

        var data = {
            ParentEntityTypeCode: 1010,
            EntityTypeCode: 1011,
            FetchXml: fetchXml,
            PrimaryRecordName: Xrm.Page.getAttribute("title").getValue(),
            FormType: Xrm.Page.ui.formSelector.getCurrentItem().getLabel(),
            CreatedOn: Xrm.Page.getAttribute("createdon").getValue(),
            Statecode: Xrm.Page.getAttribute("statecode").getSelectedOption().text,
            Ownerid: Xrm.Page.getAttribute("ownerid").getValue()[0],
            PrimaryEntityName: "Contract",
            ViewName: "RentContractLines",
            IsView: false,
            CreateButton: true,
            RefreshButton: true,
            Url: Xrm.Page.context.getClientUrl(),
        };

        objSubGrid.setVisible(true);
        objSubGrid.getObject().contentWindow.IP.CustomView.Data.Parameters = data;
    }
};

IP.Contract.SetMaintenanceContractLines = function () {
    var objSubGrid = Xrm.Page.ui.controls.get("WebResource_maintenanceContractLines");

    if (objSubGrid == null || objSubGrid.getObject().contentWindow.IP == null) {
        setTimeout(IP.Contract.SetMaintenanceContractLines, 2000);
        return;
    }

    var currentId = Xrm.Page.data.entity.getId();
    var subgridFetchXml = '<fetch>\
                        <entity name="contractdetail" >\
                            <attribute name="productid" />\
                            <attribute name="uds_quality" />\
                            <attribute name="uds_structuretag" />\
                            <attribute name="uds_timing" />\
                            <attribute name="uds_quantity" />\
                            <attribute name="expireson" />\
                            <attribute name="contractdetailid" />\
                            <attribute name="uomid" />\
                            <attribute name="uds_spaceid" />\
                            <attribute name="uds_deliveryunitcode" />\
                            <attribute name="uds_rate" />\
                            <attribute name="uds_feetypecode" />\
                            <attribute name="activeon" />\
                            <attribute name="uds_sortingfield" />\
                            <attribute name="uds_additionalinformation" />\
                            <attribute name="uds_payers" />\
                            <attribute name="uds_amountvatexcluding" />\
                            <attribute name="uds_totalvatamount" />\
                            <attribute name="uds_totalamountvatincluding" />\
                            <attribute name="uds_object_type" />\
                            <attribute name="uds_object_name" />\
                            <attribute name="customerid" />\
                            <attribute name="uds_contractid" />\
                            <filter type="and" >\
                                <condition attribute="uds_contractid" operator="eq" value="' + currentId + '" />\
                            </filter>\
                        </entity>\
                    </fetch>';


    var sourceDataType = Xrm.Page.getAttribute("uds_sourcedatatypecode");

    var viewName = (sourceDataType != null && sourceDataType.getValue() == IP.Contract.SourceDataType.Cooperatives) ?
        "MaintenanceContractLineWithPayers" : "MaintenanceContractLine";

    var data = {
        ParentEntityTypeCode: 1010,
        EntityTypeCode: 1011,
        FetchXml: subgridFetchXml,
        PrimaryRecordName: Xrm.Page.getAttribute("title").getValue(),
        FormType: Xrm.Page.ui.formSelector.getCurrentItem().getLabel(),
        CreatedOn: Xrm.Page.getAttribute("createdon").getValue(),
        Statecode: Xrm.Page.getAttribute("statecode").getSelectedOption().text,
        Ownerid: Xrm.Page.getAttribute("ownerid").getValue()[0],
        PrimaryEntityName: "Contract",
        ViewName: viewName,
        IsView: false,
        CreateButton: true,
        RefreshButton: true
    };

    objSubGrid.setVisible(true);
    objSubGrid.getObject().contentWindow.IP.CustomView.Data.Parameters = data;
};

IP.Contract.SetContractLineGridForLiabilityContract = function () {
    IP.Contract.Form.SetVisibleTabSection("tab_4", "Liability_linesgrid_section", true);

    var objSubGrid = Xrm.Page.ui.controls.get("WebResource_LiabilityLinesGrid");
    if (objSubGrid == null || objSubGrid.getObject().contentWindow.IP == null) {
        setTimeout(IP.Contract.SetContractLineGridForLiabilityContract, 2000);
        return;
    }

    var currentId = Xrm.Page.data.entity.getId();
    var fetchXml = '<fetch>\
        <entity name="contractdetail" >\
          <attribute name="productid" />\
          <attribute name="uds_totalamountvatincluding" />\
          <attribute name="activeon" />\
          <attribute name="expireson" />\
          <attribute name="contractdetailid" />\
          <attribute name="uds_description" />\
          <attribute name="uds_documentnumber" />\
          <filter type="and" >\
            <condition attribute="contractid" operator="eq" value="' + currentId + '" />\
          </filter>\
        </entity\
        </fetch>';

    var data = {
        ParentEntityTypeCode: 1010,
        EntityTypeCode: 1011,
        FetchXml: fetchXml,
        PrimaryRecordName: Xrm.Page.getAttribute("title").getValue(),
        FormType: Xrm.Page.ui.formSelector.getCurrentItem().getLabel(),
        CreatedOn: Xrm.Page.getAttribute("createdon").getValue(),
        Statecode: Xrm.Page.getAttribute("statecode").getSelectedOption().text,
        Ownerid: Xrm.Page.getAttribute("ownerid").getValue()[0],
        PrimaryEntityName: "Contract",
        ViewName: "LiabilityContractLines",
        IsView: false,
        CreateButton: true,
        RefreshButton: true,
        Url: Xrm.Page.context.getClientUrl(),
    };

    objSubGrid.setVisible(true);
    objSubGrid.getObject().contentWindow.IP.CustomView.Data.Parameters = data;

};

IP.Contract.Ribbon.OpenIGsAssociatedView = function (selectedControl, primaryEntityName, selectedEntityTypeCode) {
    var url = "/WebResources/uds_/CustomView/CustomView.html";
    var urlTest = "/WebResources/uds_/CustomView/CustomView.js";
    if (IP.Contract.Data.UrlExists(url) && IP.Contract.Data.UrlExists(urlTest)) {
        var data = {
            ParentEntityTypeCode: 1010,
            EntityTypeCode: selectedEntityTypeCode,
            FetchXml: selectedControl.GetParameter("fetchXml"),
            PrimaryRecordName: Xrm.Page.getAttribute("title").getValue(),
            FormType: Xrm.Page.ui.formSelector.getCurrentItem().getLabel(),
            CreatedOn: Xrm.Page.getAttribute("createdon").getValue(),
            Statecode: Xrm.Page.getAttribute("statecode").getSelectedOption().text,
            Ownerid: Xrm.Page.getAttribute("ownerid").getValue()[0],
            PrimaryEntityName: "Contract",
            ViewName: "InvoiceGenerations",
            IsView: true
        };

        var dialogOptions = new Xrm.DialogOptions;
        dialogOptions.width = $(window.top).width();
        dialogOptions.height = $(window.top).height() - 80;

        Xrm.Internal.openDialog(url, dialogOptions, data, null, CallbackFunction);

        function CallbackFunction(rv) {
        }
    }
}

IP.Contract.Ribbon.EnableByExistingPGContract = function () {
    var currentId = Xrm.Page.data.entity.getId();
    if (currentId != null) {
        var fetchXml = '<fetch version="1.0" >\
                        <entity name="contract" >\
                                                        <attribute name="contractid" />\
                            <filter type="and" >\
                                <condition attribute="uds_primarycontractid" operator="eq" value="' + currentId + '" />\
                            </filter>\
                        </entity>\
                    </fetch>';

        var results = XrmServiceToolkit.Soap.Fetch(fetchXml);
        if (results && results.length > 0)
            return true;
    }

    return false;
}

IP.Contract.Ribbon.DevDisplayRule = function () {
    var orgName = Xrm.Page.context.getOrgUniqueName();
    if (orgName == "PropertyCRM" || orgName == "performance") {
        return true;
    }

    return false;
}

IP.Contract.Ribbon.AddParties = function () {
    var entMetadata = UDS.GetEntityMetadata("uds_contractconnection");
    var randomnumber = 100000000 + Math.floor(Math.random() * 900000000);

    var url = Xrm.Page.context.getClientUrl() + "/main.aspx?etn=contract&extraqs=%3f_CreateFromId%3d" + Xrm.Page.data.entity.getId() + "%26_CreateFromType%3d1010%26etc%3d" + entMetadata.ObjectTypeCode + "&histKey=" + randomnumber + "&newWindow=true&pagetype=entityrecord";
    window.open(url
        , "newConnection", "height=" + top.document.body.clientHeight + ",width=" + Math.max(500, Math.floor(top.document.body.clientWidth * 0.6)))
}

IP.Contract.Data.UrlExists = function (url) {
    var request;
    if (window.XMLHttpRequest)
        request = new XMLHttpRequest();
    else
        request = new ActiveXObject("Microsoft.XMLHTTP");
    request.open('GET', Xrm.Page.context.getClientUrl() + url, false);
    request.send();

    if (request.status === 404) {
        return false;
    }

    return true;
}

IP.Contract.Data.ClearContractErrorDescription = function (contractId) {
    var contract = new XrmServiceToolkit.Soap.BusinessEntity("contract", contractId.replace('{', '').replace('}', ''));
    contract.attributes["uds_errordescription"] = null;

    XrmServiceToolkit.Soap.Update(contract);
}

IP.Contract.Data.SetLiabilityTypeByContract = function (contractType) {
    var options = Xrm.Page.getAttribute("uds_liabilitytypecode").getOptions();
    var liabilityType = Xrm.Page.getAttribute("uds_liabilitytypecode").getValue();

    Xrm.Page.getControl("uds_liabilitytypecode").removeOption(752560000);
    Xrm.Page.getControl("uds_liabilitytypecode").removeOption(752560001);
    Xrm.Page.getControl("uds_liabilitytypecode").removeOption(752560002);
    Xrm.Page.getControl("uds_liabilitytypecode").removeOption(752560003);
    Xrm.Page.getControl("uds_liabilitytypecode").removeOption(752560004);

    if (contractType == "Liability") {
        Xrm.Page.getControl("uds_liabilitytypecode").addOption(
            { value: 752560001, text: IP.Contract.Localization.GetLocalizedString("LiabilityTypeGuaranteeOption") }
        );
        Xrm.Page.getControl("uds_liabilitytypecode").addOption(
            { value: 752560002, text: IP.Contract.Localization.GetLocalizedString("LiabilityTypeEncumberanceOption") }
        );
    }
    else {
        Xrm.Page.getControl("uds_liabilitytypecode").addOption(
            { value: 752560000, text: IP.Contract.Localization.GetLocalizedString("LiabilityTypeInsuranceOption") }
        );
        Xrm.Page.getControl("uds_liabilitytypecode").addOption(
            { value: 752560003, text: IP.Contract.Localization.GetLocalizedString("LiabilityTypeFullCoverageOption") }
        );
        Xrm.Page.getControl("uds_liabilitytypecode").addOption(
            { value: 752560004, text: IP.Contract.Localization.GetLocalizedString("LiabilityTypeVoluntaryWorkOption") }
        );
    }

    Xrm.Page.getAttribute("uds_liabilitytypecode").setValue(liabilityType);
}