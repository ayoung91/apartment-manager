using Components.Data;
using Components.Entities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Components.Logic
{
    public class BillingCycleLogic
    {
        public List<BillingCycle> GetBillingCycles()
        {
            var currentMonth = DateTime.Now.ToString("MMMM");
            var currentYear = DateTime.Now.Year;
            var data = new BillingCycleData().GetBillingCycles();

            var currentBillingCycle = data.Where(w => w.BillingMonth == currentMonth && w.BillingYear == currentYear).FirstOrDefault();
            return data.Where(w => w.Id < currentBillingCycle.Id + 2).ToList();
        }
    }
}
