using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Autofac;
using dbmusic.Models;

namespace dbmusic
{
    public class AllServices : Module
    {
        protected override void Load(ContainerBuilder builder) 
        {
            base.Load(builder);
            builder.RegisterType<Artists>().As<Artists>();
        }
    }
}
