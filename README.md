## Notes about this project.
Sorry if this is rough. It's been a few years since I've written .Net and I've never used Angular. We were using Ruby and Knockout for the last few years at my last employer. It'll take me a little while to get back up to speed.ek.
There's no authorization happening in this project. It's a wide open rest api with typical verbs.
I typically like the skinny controller - fat model paradigm. I'd probably move update and delete logic out of the controller and onto the model, but haven't had time to do that yet.

## Steps to create this project
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

7. Create and run migration *Do this every time you add a new model and DbSet*
    ```
    * Run `dotnet ef migrations add InitialCreate` to scaffold a migration and create the initial set of tables for the model.
    * Run `dotnet ef database update` to apply the new migration to the database. This command creates the database before applying migrations.
        * If you don't do this, you'll get errors like "SQLite Error 1: 'no such table"

7. Add API Controllers with CRUD operations
8. Add new components and client side routing for those components.