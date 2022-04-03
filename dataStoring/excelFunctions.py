from django_project.settings import MEDIA_ROOT
import xlsxwriter


class ExcelFunctions():
    a = 0

    @staticmethod
    def RemoveSpecialSymbols(string):
        return ''.join( c for c in string if  c not in '?:!/;' )
    @staticmethod
    def CreateExcel(name):

        pathName = MEDIA_ROOT+'/' + ExcelFunctions.RemoveSpecialSymbols(name)+ '.xlsx'

        workbook = xlsxwriter.Workbook(pathName)
        worksheet = workbook.add_worksheet()
        worksheet.write('A1', 'Hello world')
        workbook.close()
