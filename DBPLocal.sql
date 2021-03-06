USE [master]
GO
/****** Object:  Database [PlanificacionDeLocal]    Script Date: 08/02/2018 03:35:48 p.m. ******/
CREATE DATABASE [PlanificacionDeLocal]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'PlanificacionDeLocal', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.MSSQLSERVER\MSSQL\DATA\PlanificacionDeLocal.mdf' , SIZE = 5120KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'PlanificacionDeLocal_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.MSSQLSERVER\MSSQL\DATA\PlanificacionDeLocal_log.ldf' , SIZE = 1536KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [PlanificacionDeLocal].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [PlanificacionDeLocal] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [PlanificacionDeLocal] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [PlanificacionDeLocal] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [PlanificacionDeLocal] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [PlanificacionDeLocal] SET ARITHABORT OFF 
GO
ALTER DATABASE [PlanificacionDeLocal] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [PlanificacionDeLocal] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [PlanificacionDeLocal] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [PlanificacionDeLocal] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [PlanificacionDeLocal] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [PlanificacionDeLocal] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [PlanificacionDeLocal] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [PlanificacionDeLocal] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [PlanificacionDeLocal] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [PlanificacionDeLocal] SET  DISABLE_BROKER 
GO
ALTER DATABASE [PlanificacionDeLocal] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [PlanificacionDeLocal] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [PlanificacionDeLocal] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [PlanificacionDeLocal] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [PlanificacionDeLocal] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [PlanificacionDeLocal] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [PlanificacionDeLocal] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [PlanificacionDeLocal] SET RECOVERY FULL 
GO
ALTER DATABASE [PlanificacionDeLocal] SET  MULTI_USER 
GO
ALTER DATABASE [PlanificacionDeLocal] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [PlanificacionDeLocal] SET DB_CHAINING OFF 
GO
ALTER DATABASE [PlanificacionDeLocal] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [PlanificacionDeLocal] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
EXEC sys.sp_db_vardecimal_storage_format N'PlanificacionDeLocal', N'ON'
GO
USE [PlanificacionDeLocal]
GO
/****** Object:  Schema [PDL]    Script Date: 08/02/2018 03:35:49 p.m. ******/
CREATE SCHEMA [PDL]
GO
/****** Object:  Table [dbo].[__MigrationHistory]    Script Date: 08/02/2018 03:35:49 p.m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[__MigrationHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ContextKey] [nvarchar](300) NOT NULL,
	[Model] [varbinary](max) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK_dbo.__MigrationHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC,
	[ContextKey] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [PDL].[Actividad]    Script Date: 08/02/2018 03:35:49 p.m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [PDL].[Actividad](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[DescricionDeLaActividad] [nvarchar](80) NOT NULL,
	[TipoActividadId] [int] NOT NULL,
 CONSTRAINT [PK_PDL.Actividad] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [PDL].[DetalleActividad]    Script Date: 08/02/2018 03:35:49 p.m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [PDL].[DetalleActividad](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[FechaRealizacion] [datetime] NOT NULL,
	[FechaInicio] [datetime] NOT NULL,
	[FechaFin] [datetime] NOT NULL,
	[UnidadId] [int] NOT NULL,
	[LocalId] [int] NOT NULL,
	[ActividadId] [int] NOT NULL,
 CONSTRAINT [PK_PDL.DetalleActividad] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [PDL].[Local]    Script Date: 08/02/2018 03:35:49 p.m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [PDL].[Local](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[NumLocal] [nvarchar](10) NOT NULL,
	[Descripcion] [nvarchar](255) NOT NULL,
	[Capacidad] [int] NOT NULL,
	[UnidadId] [int] NOT NULL,
	[TipoLocalId] [int] NOT NULL,
 CONSTRAINT [PK_PDL.Local] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [PDL].[TipoActividad]    Script Date: 08/02/2018 03:35:49 p.m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [PDL].[TipoActividad](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Descripcion] [nvarchar](60) NOT NULL,
 CONSTRAINT [PK_PDL.TipoActividad] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [PDL].[TipoLocal]    Script Date: 08/02/2018 03:35:49 p.m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [PDL].[TipoLocal](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[DescripcionTipoLocal] [nvarchar](60) NOT NULL,
 CONSTRAINT [PK_PDL.TipoLocal] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [PDL].[Unidad]    Script Date: 08/02/2018 03:35:49 p.m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [PDL].[Unidad](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[DescripcionUnidad] [nvarchar](255) NOT NULL,
 CONSTRAINT [PK_PDL.Unidad] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Index [IX_TipoActividadId]    Script Date: 08/02/2018 03:35:49 p.m. ******/
CREATE NONCLUSTERED INDEX [IX_TipoActividadId] ON [PDL].[Actividad]
(
	[TipoActividadId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_ActividadId]    Script Date: 08/02/2018 03:35:49 p.m. ******/
CREATE NONCLUSTERED INDEX [IX_ActividadId] ON [PDL].[DetalleActividad]
(
	[ActividadId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_LocalId]    Script Date: 08/02/2018 03:35:49 p.m. ******/
CREATE NONCLUSTERED INDEX [IX_LocalId] ON [PDL].[DetalleActividad]
(
	[LocalId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_UnidadId]    Script Date: 08/02/2018 03:35:49 p.m. ******/
CREATE NONCLUSTERED INDEX [IX_UnidadId] ON [PDL].[DetalleActividad]
(
	[UnidadId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_TipoLocalId]    Script Date: 08/02/2018 03:35:49 p.m. ******/
CREATE NONCLUSTERED INDEX [IX_TipoLocalId] ON [PDL].[Local]
(
	[TipoLocalId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_UnidadId]    Script Date: 08/02/2018 03:35:49 p.m. ******/
CREATE NONCLUSTERED INDEX [IX_UnidadId] ON [PDL].[Local]
(
	[UnidadId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [PDL].[Actividad]  WITH CHECK ADD  CONSTRAINT [FK_PDL.Actividad_PDL.TipoActividad_TipoActividadId] FOREIGN KEY([TipoActividadId])
REFERENCES [PDL].[TipoActividad] ([Id])
GO
ALTER TABLE [PDL].[Actividad] CHECK CONSTRAINT [FK_PDL.Actividad_PDL.TipoActividad_TipoActividadId]
GO
ALTER TABLE [PDL].[DetalleActividad]  WITH CHECK ADD  CONSTRAINT [FK_PDL.DetalleActividad_PDL.Actividad_ActividadId] FOREIGN KEY([ActividadId])
REFERENCES [PDL].[Actividad] ([Id])
GO
ALTER TABLE [PDL].[DetalleActividad] CHECK CONSTRAINT [FK_PDL.DetalleActividad_PDL.Actividad_ActividadId]
GO
ALTER TABLE [PDL].[DetalleActividad]  WITH CHECK ADD  CONSTRAINT [FK_PDL.DetalleActividad_PDL.Local_LocalId] FOREIGN KEY([LocalId])
REFERENCES [PDL].[Local] ([Id])
GO
ALTER TABLE [PDL].[DetalleActividad] CHECK CONSTRAINT [FK_PDL.DetalleActividad_PDL.Local_LocalId]
GO
ALTER TABLE [PDL].[DetalleActividad]  WITH CHECK ADD  CONSTRAINT [FK_PDL.DetalleActividad_PDL.Unidad_UnidadId] FOREIGN KEY([UnidadId])
REFERENCES [PDL].[Unidad] ([Id])
GO
ALTER TABLE [PDL].[DetalleActividad] CHECK CONSTRAINT [FK_PDL.DetalleActividad_PDL.Unidad_UnidadId]
GO
ALTER TABLE [PDL].[Local]  WITH NOCHECK ADD  CONSTRAINT [FK_PDL.Local_PDL.TipoLocal_TipoLocalId] FOREIGN KEY([TipoLocalId])
REFERENCES [PDL].[TipoLocal] ([Id])
GO
ALTER TABLE [PDL].[Local] CHECK CONSTRAINT [FK_PDL.Local_PDL.TipoLocal_TipoLocalId]
GO
ALTER TABLE [PDL].[Local]  WITH NOCHECK ADD  CONSTRAINT [FK_PDL.Local_PDL.Unidad_UnidadId] FOREIGN KEY([UnidadId])
REFERENCES [PDL].[Unidad] ([Id])
GO
ALTER TABLE [PDL].[Local] CHECK CONSTRAINT [FK_PDL.Local_PDL.Unidad_UnidadId]
GO
/****** Object:  StoredProcedure [dbo].[ActividadXRangoFecha]    Script Date: 08/02/2018 03:35:49 p.m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[ActividadXRangoFecha]
(
	@Desde DATETIME,
	@Hasta DATETIME,
	@Tipo INT
)
AS
DECLARE @INFO TABLE( ID INT,
		Solicitante NVARCHAR(80),
		Actividad NVARCHAR(80),
		Tipo NVARCHAR(60),
		Local NVARCHAR(80))
BEGIN
INSERT INTO @INFO
SELECT	A.Id,
		U.DescripcionUnidad,
		A.DescricionDeLaActividad,
		TA.Descripcion,
		L.Descripcion	

FROM PDL.Actividad A INNER JOIN PDL.DetalleActividad DA
		ON DA.ActividadId = A.Id INNER JOIN PDL.TipoActividad TA
		ON A.TipoActividadId = TA.Id INNER JOIN PDL.Local L
		ON DA.LocalId = L.Id INNER JOIN PDL.Unidad U 
		ON DA.UnidadId = U.Id
		WHERE TA.Id = @Tipo AND DA.FechaRealizacion >= @Desde
		AND DA.FechaRealizacion <= @Hasta
		GROUP BY A.Id ,U.DescripcionUnidad,A.DescricionDeLaActividad,
		TA.Descripcion,L.Descripcion
		ORDER BY A.DescricionDeLaActividad

SELECT	F.Actividad,
		F.Solicitante,
		F.Tipo,
		F.Local
FROM @INFO F
END




GO
/****** Object:  StoredProcedure [dbo].[FrecuenciaPrestamoLocal]    Script Date: 08/02/2018 03:35:49 p.m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[FrecuenciaPrestamoLocal]
(
	@Desde DATETIME,
	@Hasta DATETIME,
	@IdLoc INT
)
AS
BEGIN
SELECT	L.NumLocal AS NoLocal,
		L.Descripcion AS Local,
		L.Capacidad,
		SUM(CASE WHEN DA.LocalId = @IdLoc THEN 1 ELSE 0 END) AS CntPrestamo		

FROM PDL.Actividad AS A INNER JOIN PDL.DetalleActividad AS DA 
					ON DA.ActividadId = A.Id INNER JOIN PDL.Local AS L
					ON DA.LocalId = L.Id
					WHERE DA.FechaRealizacion >= @DESDE AND DA.FechaRealizacion <= @HASTA AND DA.LocalId =@IdLoc
					GROUP BY L.NumLocal ,L.Descripcion,L.Capacidad
END


GO
/****** Object:  StoredProcedure [dbo].[HorasConsumoXLocal]    Script Date: 08/02/2018 03:35:49 p.m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[HorasConsumoXLocal] 
(	
	@Desde DATETIME,
	@Hasta DATETIME,
	@IDLocal INT

)

AS
BEGIN
select	l.NumLocal AS NumLoc,
		l.Descripcion AS Local,
		l.Capacidad,
		(SUM(Datediff(minute,da.FechaInicio,da.FechaFin))/60) AS TOTAL_HORAS

from pdl.DetalleActividad as da inner join PDL.Local as l on da.LocalId = l.id
Where da.LocalId = @IDLocal AND da.FechaRealizacion >= @Desde AND da.FechaRealizacion <=@Hasta
GROUP BY L.NumLocal, l.Descripcion, L.Capacidad


END




GO
/****** Object:  StoredProcedure [dbo].[ListaActividad]    Script Date: 08/02/2018 03:35:49 p.m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[ListaActividad]
(
	@PDescripcion NVARCHAR(80)
)
AS

SET @PDescripcion = '%'+@PDescripcion+'%'

BEGIN
 SELECT DISTINCT	A.Id,
		TA.Descripcion AS TipoActividad,
		U.DescripcionUnidad,
		A.DescricionDeLaActividad			

 FROM PDL.Actividad AS A INNER JOIN PDL.DetalleActividad AS DA ON DA.ActividadId = A.Id
						INNER JOIN PDL.TipoActividad AS TA ON A.TipoActividadId = TA.Id
						INNER JOIN PDL.Unidad AS U ON DA.UnidadId = U.Id 
						 
 WHERE A.DescricionDeLaActividad LIKE @PDescripcion COLLATE Modern_Spanish_CI_AI 
 ORDER BY A.DescricionDeLaActividad
 
 END
GO
/****** Object:  StoredProcedure [dbo].[ListaDeLocal]    Script Date: 08/02/2018 03:35:49 p.m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[ListaDeLocal](@PDescripcion NVARCHAR(250))
AS

SET @PDescripcion = '%'+ @PDescripcion+'%'

BEGIN
SELECT	L.Id  AS Id,
		l.NumLocal,
		u.DescripcionUnidad AS DescripcionUnidad,
		TL.DescripcionTipoLocal AS DescripcionTipoLocal,
		L.Descripcion AS Descripcion,
		l.Capacidad 

FROM PDL.Local L INNER JOIN PDL.TipoLocal TL ON L.TipoLocalId = TL.Id
				INNER JOIN PDL.Unidad U ON L.UnidadId = U.Id
				WHERE L.Descripcion LIKE @PDescripcion Collate Modern_Spanish_CI_AI
				ORDER BY L.Descripcion
END
GO
/****** Object:  StoredProcedure [dbo].[ListadoDeTiposActividad]    Script Date: 08/02/2018 03:35:49 p.m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[ListadoDeTiposActividad]
AS
BEGIN
SELECT TA.Descripcion
FROM PDL.TipoActividad AS TA
END


GO
/****** Object:  StoredProcedure [dbo].[ListadoDeTiposLocal]    Script Date: 08/02/2018 03:35:49 p.m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[ListadoDeTiposLocal]
AS
BEGIN
SELECT TL.DescripcionTipoLocal
FROM PDL.TipoLocal AS TL
END


GO
/****** Object:  StoredProcedure [dbo].[ListaLocal]    Script Date: 08/02/2018 03:35:49 p.m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[ListaLocal](@pCadena NVARCHAR(250))
AS

SET @pCadena = '%'+ @pCadena+'%'

BEGIN
SELECT	L.Id  AS Id,
		l.NumLocal,
		u.DescripcionUnidad AS DescripcionUnidad,
		TL.DescripcionTipoLocal AS DescripcionTipoLocal,
		L.Descripcion AS Descripcion,
		l.Capacidad 

FROM PDL.Local L INNER JOIN PDL.TipoLocal TL ON L.TipoLocalId = TL.Id
				INNER JOIN PDL.Unidad U ON L.UnidadId = U.Id
				WHERE L.NumLocal LIKE @pCadena Collate Modern_Spanish_CI_AI
				ORDER BY L.Descripcion
END
GO
/****** Object:  StoredProcedure [dbo].[ListarLocales]    Script Date: 08/02/2018 03:35:49 p.m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[ListarLocales]
AS
BEGIN
select L.NumLocal AS Num_Local,
		TL.DescripcionTipoLocal AS Tipo,
		L.Descripcion AS Descripcion,
		U.DescripcionUnidad AS Unidad,
		L.Capacidad

from PDL.Local L INNER JOIN PDL.TipoLocal TL ON TL.Id = L.TipoLocalId
		INNER JOIN PDL.Unidad U ON U.Id = L.UnidadId
		ORDER BY L.Descripcion
END


GO
/****** Object:  StoredProcedure [dbo].[ListarUnidades]    Script Date: 08/02/2018 03:35:49 p.m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[ListarUnidades]
AS
BEGIN
select U.DescripcionUnidad AS Unidad
from PDL.Unidad U
ORDER BY U.DescripcionUnidad
END




GO
/****** Object:  StoredProcedure [dbo].[ListaTipoActividad]    Script Date: 08/02/2018 03:35:49 p.m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[ListaTipoActividad]
(
	@PDescripcion NVARCHAR(60)
)
AS

SET @PDescripcion = '%'+ @PDescripcion+'%'

BEGIN
select	T.Id,
		T.Descripcion
from PDL.TipoActividad T
where T.Descripcion	LIKE @PDescripcion	COLLATE Modern_Spanish_CI_AI
ORDER BY T.Descripcion
END
GO
/****** Object:  StoredProcedure [dbo].[ListaTipoLocal]    Script Date: 08/02/2018 03:35:49 p.m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[ListaTipoLocal]
 (
	@PDescripcion NVARCHAR(80)
 )
 AS

 SET @PDescripcion = '%'+@PDescripcion+'%'

 BEGIN
 SELECT	TP.Id,
		TP.DescripcionTipoLocal 
 FROM PDL.TipoLocal TP
 WHERE TP.DescripcionTipoLocal LIKE @PDescripcion COLLATE Modern_Spanish_CI_AI
 ORDER BY TP.DescripcionTipoLocal
 END




GO
/****** Object:  StoredProcedure [dbo].[ListaUnidad]    Script Date: 08/02/2018 03:35:49 p.m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[ListaUnidad]
(
	@PDescripcion NVARCHAR(80)
)
AS

SET @PDescripcion = '%'+@PDescripcion+'%'

BEGIN
select	U.Id ,
		U.DescripcionUnidad  
 from PDL.Unidad U
 where U.DescripcionUnidad LIKE @PDescripcion COLLATE Modern_Spanish_CI_AI
 ORDER BY U.DescripcionUnidad
 END




GO
USE [master]
GO
ALTER DATABASE [PlanificacionDeLocal] SET  READ_WRITE 
GO
