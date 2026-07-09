# # ================================
# # Build stage
# # ================================
# FROM maven:3.9.6-eclipse-temurin-17-alpine AS build
# WORKDIR /app

# # Copy pom.xml and download dependencies
# COPY pom.xml .
# RUN mvn dependency:go-offline -B

# # Copy source code
# COPY src ./src

# # Build the application
# RUN mvn clean package -DskipTests


# # ================================
# # Package stage
# # ================================
# FROM eclipse-temurin:17-jre-alpine
# WORKDIR /app

# # Install curl for health checks
# RUN apk add --no-cache curl

# # Create non-root user
# RUN addgroup -S spring && adduser -S spring -G spring
# USER spring:spring

# # Copy built jar
# COPY --from=build /app/target/*.jar app.jar

# # Expose port
# EXPOSE 8080

# # Health check
# HEALTHCHECK --interval=30s --timeout=3s --start-period=60s --retries=3 \
#   CMD curl -f http://localhost:8080/actuator/health || exit 1

# # Run application
# ENTRYPOINT ["java", \
#  "-Djava.security.egd=file:/dev/./urandom", \
#  "-Xms256m", \
#  "-Xmx512m", \
#  "-jar", \
#  "app.jar"]

# Build Stage
FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Run Stage
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

# Ensure port 7860 is used for Hugging Face
EXPOSE 7860
ENV PORT=7860

ENTRYPOINT ["java", "-jar", "app.jar"]