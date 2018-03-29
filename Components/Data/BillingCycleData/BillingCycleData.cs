using Components.Data.DataContext;
using Components.Entities;
using System.Collections.Generic;
using System.Linq;

namespace Components.Data
{
    public class BillingCycleData
    {
        public List<BillingCycle> GetBillingCycles()
        {
            using (var db = new ApartmentManagerContext())
            {
                var billingCycles = db.BillingCycle
                    .OrderByDescending(o => o.Id)
                    .ToList();

                return billingCycles;
            }
        }
    }
}
