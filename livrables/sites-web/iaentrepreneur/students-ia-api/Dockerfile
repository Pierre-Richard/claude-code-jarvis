# syntax=docker/dockerfile:1
# Image de l'API .NET pour Render / Railway.
# Contexte de build attendu : le dossier students-ia-api/.

# --- Étape 1 : build ---
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# Copier d'abord les .csproj et restaurer : la couche est mise en cache tant
# que les dépendances ne changent pas (builds suivants plus rapides).
COPY StudentsIA.Domain/StudentsIA.Domain.csproj StudentsIA.Domain/
COPY StudentsIA.Application/StudentsIA.Application.csproj StudentsIA.Application/
COPY StudentsIA.Infrastructure/StudentsIA.Infrastructure.csproj StudentsIA.Infrastructure/
COPY StudentsIA.Api/StudentsIA.Api.csproj StudentsIA.Api/
RUN dotnet restore StudentsIA.Api/StudentsIA.Api.csproj

# Copier le reste du code et publier en Release.
COPY . .
RUN dotnet publish StudentsIA.Api/StudentsIA.Api.csproj -c Release -o /app/publish /p:UseAppHost=false

# --- Étape 2 : runtime (image légère, sans le SDK) ---
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

# Port d'écoute par défaut. Render/Railway peuvent surcharger via la variable PORT
# (gérée aussi dans Program.cs).
ENV ASPNETCORE_URLS=http://+:10000
EXPOSE 10000

ENTRYPOINT ["dotnet", "StudentsIA.Api.dll"]
