﻿//------------------------------------------------------------------------------
// <auto-generated>
//     此代码已从模板生成。
//
//     手动更改此文件可能导致应用程序出现意外的行为。
//     如果重新生成代码，将覆盖对此文件的手动更改。
// </auto-generated>
//------------------------------------------------------------------------------

namespace MyWeb.DAL
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class MyDBEntitiesModel : DbContext
    {
        public MyDBEntitiesModel()
            : base("name=MyDBEntitiesModel")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<MyUser> MyUser { get; set; }
        public virtual DbSet<ProcessTask> ProcessTask { get; set; }
        public virtual DbSet<CollectionProcess> CollectionProcess { get; set; }
    }
}
