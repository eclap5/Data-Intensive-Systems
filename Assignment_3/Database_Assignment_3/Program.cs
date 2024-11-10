using Microsoft.EntityFrameworkCore;
using Database_Assignment_3.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ASDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DBConnection_AS"))
);
builder.Services.AddDbContext<EUDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DBConnection_EU"))
);
builder.Services.AddDbContext<USDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DBConnection_US"))
);

// Add services to the container.
builder.Services.AddRazorPages();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapRazorPages();

app.Run();
