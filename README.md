1. dotnet new angular
2. npm install
3. add Models folder and build out models include EF Context
    * May need extra DbSet for different models?

### This portion is from [Use SQLite instead of InMemory](https://docs.microsoft.com/en-us/ef/core/get-started/netcore/new-db-sqlite)    
4. Add entity framework packages in terminal
    ```
    dotnet add package Microsoft.EntityFrameworkCore.Sqlite
    dotnet add package Microsoft.EntityFrameworkCore.Design
    ``` 
5. Add the ef tool to the .csproj file 
    ```
    <ItemGroup>
        <DotNetCliToolReference Include="Microsoft.EntityFrameworkCore.Tools.DotNet" Version="2.0.0" />
    </ItemGroup>
    ```
6. * Startup.cs
    * Add reference to model namespace, EF library then configure the database context
    ```
    using Microsoft.EntityFrameworkCore;
    using TodoApi.Models;
    ```
    ```
    public void ConfigureServices(IServiceCollection services)
    {   
        //Goes into environment specific folder eg: /Debug/app/TodoList.pdb
        services.AddDbContext<TodoContext>(options => options.UseSqlite("Data Source=TodoList.db"));
        services.AddMvc();
    }
    ```
    * Run `dotnet ef migrations add InitialCreate` to scaffold a migration and create the initial set of tables for the model.
    * Run `dotnet ef database update` to apply the new migration to the database. This command creates the database before applying migrations.
        * If you don't do this, you'll get errors like "SQLite Error 1: 'no such table"

7. Add API Controllers with CRUD operations