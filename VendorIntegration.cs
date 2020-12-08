using Microsoft.Xrm.Sdk;
using Property.Billing.BaswareIntegration.Enums;
using Property.Billing.BaswareIntegration.Services;
using System;

namespace Property.Billing.BaswareIntegration.Plugins
{
    public class VendorIntegration : BasePlugin
    {
        public VendorIntegration()
        { 
            StepManager
                .NewStep()
                    .Message("Delete")
                    .EntityName("account")
                    .Stage(PluginStage.PostOperation)
                    .RequiredPreImages("PreImage")
                    .PluginAction(HandleDeleteVendor)
                .Register();

            StepManager
                .NewStep()
                    .Message("Delete")
                    .EntityName("contact")
                    .Stage(PluginStage.PostOperation)
                    .RequiredPreImages("PreImage")
                    .PluginAction(HandleDeleteVendor)
                .Register();

            StepManager
                .NewStep()
                    .Message("Update")
                    .EntityName("account")
                    .Stage(PluginStage.PostOperation)
                    .RequiredPreImages("PreImage")
                    .PluginAction(HandleUpdateVendor)
                .Register();

            StepManager
                .NewStep()
                    .Message("Update")
                    .EntityName("contact")
                    .Stage(PluginStage.PostOperation)
                    .RequiredPreImages("PreImage")
                    .PluginAction(HandleUpdateVendor)
                .Register();

            StepManager
                .NewStep()
                    .Message("Delete")
                    .EntityName("uds_bankaccount")
                    .Stage(PluginStage.PostOperation)
                    .RequiredPreImages("PreImage")
                    .PluginAction(HandleDeleteBankAccount)
                .Register();

            StepManager
                .NewStep()
                    .Message("Update")
                    .EntityName("uds_bankaccount")
                    .Stage(PluginStage.PostOperation)
                    .RequiredPreImages("PreImage")
                    .PluginAction(HandleUpdateBankAccount)
                .Register();
        }

        protected void HandleUpdateVendor(LocalPluginContext context)
        {
            var preImage = context.PluginExecutionContext.PreEntityImages["PreImage"] as Entity;
            var target = context.PluginExecutionContext.InputParameters["Target"] as Entity;

            if(preImage.Contains("uds_integratedwithcode") && 
               preImage.GetAttributeValue<OptionSetValue>("uds_integratedwithcode").Value == IntegratedSystemCode.Basware.GetHashCode())
            {
                if(target.Contains("statecode") &&
                   target.GetAttributeValue<OptionSetValue>("statecode").Value !=
                   preImage.GetAttributeValue<OptionSetValue>("statecode").Value)
                { 
                    new BaswareExchangeService(context.OrganizationService)
                        .CreateUpdationLog(preImage.ToEntityReference(), 
                            BaswareEntityCode.Vendor, 
                            context.PluginExecutionContext.InitiatingUserId);
                }
            }
        }

        protected void HandleUpdateBankAccount(LocalPluginContext context)
        {
            var preImage = context.PluginExecutionContext.PreEntityImages["PreImage"] as Entity;
            var target = context.PluginExecutionContext.InputParameters["Target"] as Entity;

            if(preImage.Contains("uds_integratedwithcode") && 
               preImage.GetAttributeValue<OptionSetValue>("uds_integratedwithcode").Value == IntegratedSystemCode.Basware.GetHashCode()) 
            {
                if(target.Contains("uds_name") ||
                    target.Contains("uds_operatorid") ||
                    target.Contains("uds_personid") ||
                    target.Contains("uds_organizationid") ||
                    (target.Contains("statecode") &&
                     target.GetAttributeValue<OptionSetValue>("statecode").Value !=
                     preImage.GetAttributeValue<OptionSetValue>("statecode").Value)) 
                {
                    new BaswareExchangeService(context.OrganizationService)
                        .CreateBankAccountUpdatingLog(preImage,
                            target,
                            context.PluginExecutionContext.InitiatingUserId);
                }
            }
        }

        protected void HandleDeleteBankAccount(LocalPluginContext context)
        {
            var preImage = context.PluginExecutionContext.PreEntityImages["PreImage"] as Entity;

            if(preImage.Contains("uds_integratedwithcode") && 
               preImage.GetAttributeValue<OptionSetValue>("uds_integratedwithcode").Value == IntegratedSystemCode.Basware.GetHashCode())
            {
                var vendorId = preImage.Contains("uds_organizationid") 
                    ? preImage.GetAttributeValue<EntityReference>("uds_organizationid").Id
                    : preImage.Contains("uds_personid") 
                        ? preImage.GetAttributeValue<EntityReference>("uds_personid").Id 
                        : Guid.Empty;
                    
                new BaswareExchangeService(context.OrganizationService)
                    .ProccessDeleteBankAccount(
                        preImage.ToEntityReference(),
                        vendorId,
                        context.PluginExecutionContext.InitiatingUserId);
            }
        }

        protected void HandleDeleteVendor(LocalPluginContext context)
        {
            var preImage = context.PluginExecutionContext.PreEntityImages["PreImage"] as Entity;

            if(preImage.Contains("uds_integratedwithcode") && 
               preImage.GetAttributeValue<OptionSetValue>("uds_integratedwithcode").Value == IntegratedSystemCode.Basware.GetHashCode())
            {
                new BaswareExchangeService(context.OrganizationService)
                    .CreateDelitionLog(preImage.ToEntityReference(),
                        preImage.Id.ToString(),
                        BaswareEntityCode.Vendor, 
                        context.PluginExecutionContext.InitiatingUserId);
            }
        }

    }
}
