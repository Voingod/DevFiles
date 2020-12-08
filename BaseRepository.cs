using Microsoft.Crm.Sdk.Messages;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Messages;
using Microsoft.Xrm.Sdk.Query;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Property.IoT.DataTransfer.Repositories
{
    public class CrmRepository 
    {
        protected IOrganizationService _service;
        protected string entityName;

        public CrmRepository(IOrganizationService service, string entityName)
        {
			this.entityName = entityName;
            _service = service;
        }

        protected IOrganizationService Service
        {
            get
            {
                return _service;
            }
        }

        public T GetCrmEntityById(Guid id)
        {
            return (T)_service.Retrieve(entityName, id, new ColumnSet(true));
        }

        public T GetCrmEntityById(Guid id, ColumnSet columns)
        {
            return (T)_service.Retrieve(entityName, id, columns);
        }

        public void Delete(Guid id) {
            _service.Delete(entityName, id);
        }

        public List<Entity> GetByIds(Guid[] recordIds, ColumnSet columns = null)
        {
            var query = new QueryExpression(entityName)
            {
                ColumnSet = columns ?? new ColumnSet(true),
                Criteria = {
                    Conditions = {
                        new ConditionExpression(entityName + "id", ConditionOperator.In, recordIds)
                    }
                }
            };

            return _service.RetrieveMultiple(query).Entities.Select(e => e.ToEntity<Entity>()).ToList();
        }

        public EntityReference GetCrmEntityRefByAttribute(string attribute, object value)
        {
            Entity result = null;

            if (value != null)
            {
                QueryByAttribute query = new QueryByAttribute(entityName)
                {
                    ColumnSet = new ColumnSet(),
                    Attributes = { attribute },
                    Values = { value }
                };

                result = _service.RetrieveMultiple(query).Entities.FirstOrDefault();
            }

            return result != null ? result.ToEntityReference() : null;
        }

        public IList<Entity> GetEntitiesByField(string field, object value, ColumnSet columns)
        {
            var queryByAttribute = new QueryByAttribute(entityName)
            {
                ColumnSet = columns,
                Attributes = { field },
                Values = { value }
            };

            return _service.RetrieveMultiple(queryByAttribute).Entities.Select(e => e.ToEntity<Entity>()).ToList();
        }

        public IList<Entity> GetEntitiesByField(string field, object value, ColumnSet columns, OrderExpression order)
        {
            var queryByAttribute = new QueryByAttribute(entityName)
            {
                ColumnSet = columns,
                Attributes = { field },
                Values = { value },
                Orders = { order }
            };

            return _service.RetrieveMultiple(queryByAttribute).Entities.Select(e => e.ToEntity<Entity>()).ToList();
        }

        private IList<Entity> GetEntitiesByField(string linkName, string field, object value, ColumnSet columns)
        {
            var queryByAttribute = new QueryByAttribute(linkName)
            {
                ColumnSet = columns,
                Attributes = { field },
                Values = { value }
            };

            return _service.RetrieveMultiple(queryByAttribute).Entities;
        }

        public IList<Entity> GetEntitiesByFieldActive(string field, object value, ColumnSet columns, OrderExpression order)
        {
            var queryByAttribute = new QueryByAttribute(entityName)
            {
                ColumnSet = columns,
                Attributes = { field, "statecode" },
                Values = { value, 0 },
                Orders = { order }
            };

            return _service.RetrieveMultiple(queryByAttribute).Entities.Select(e => e.ToEntity<Entity>()).ToList();
        }

        public EntityCollection GetAll(PagingInfo pagingInfo, ColumnSet columnSet = null)
        {
            if (pagingInfo == null)
                throw new ArgumentNullException("pagingInfo");
            columnSet = columnSet ?? null;

            QueryExpression query = new QueryExpression(entityName)
            {
                ColumnSet = columnSet,
                PageInfo = pagingInfo,
                Orders =
                {
                    new OrderExpression("createdon", OrderType.Ascending)
                },
                Distinct = true
            };

            return Service.RetrieveMultiple(query);
        }

        public IList<Entity> ExecuteRequest(QueryBase query)
        {
            return _service.RetrieveMultiple(query).Entities.Cast<Entity>().ToList();
        }

        protected OrganizationResponse Execute(OrganizationRequest query)
        {
            return _service.Execute(query);
        }

        public void Update(T entity)
        {
            _service.Update(entity.ToEntity<Entity>());
        }

        public Guid Create(T entity)
        {
            return _service.Create(entity.ToEntity<Entity>());
        }

        public void SetStatus(EntityReference entityRef, int state, int status = -1)
        {
            _service.Execute(new SetStateRequest()
            {
                EntityMoniker = entityRef,
                State = new OptionSetValue(state),
                Status = new OptionSetValue(status)
            });
        }

        public void SetStatus(Guid recordId, int state, int status = -1)
        {
            _service.Execute(new SetStateRequest()
            {
                EntityMoniker = new EntityReference(entityName, recordId),
                State = new OptionSetValue(state),
                Status = new OptionSetValue(status)
            });
        }

        public IList<Guid> GetLinkedEntities(string linkName, string attributefrom, string attributeto, Guid id)
        {
            return GetEntitiesByField(linkName, attributeto, id, new ColumnSet(attributefrom)).
                Select(link => (Guid)link[attributefrom]).ToList();
        }

        public void Disassociate(string relationship, EntityReference target, params EntityReference[] entities)
        {
            _service.Execute(new DisassociateRequest()
            {
                Target = target,
                RelatedEntities = new EntityReferenceCollection(entities),
                Relationship = new Relationship(relationship)
            });
        }

        public void Associate(string relationship, EntityReference target, params EntityReference[] entities)
        {
            _service.Execute(new AssociateRequest()
            {
                Target = target,
                RelatedEntities = new EntityReferenceCollection(entities),
                Relationship = new Relationship(relationship)
            });
        }
    }
}
