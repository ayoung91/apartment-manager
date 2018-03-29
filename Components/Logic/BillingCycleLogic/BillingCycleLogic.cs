using Components.Data;
using Components.Entities;
using System.Collections.Generic;

namespace Components.Logic
{
    public class BillingCycleLogic
    {
        public List<BillingCycle> GetBillingCycles()
        {
            return new BillingCycleData().GetBillingCycles();
        }
    }
}
