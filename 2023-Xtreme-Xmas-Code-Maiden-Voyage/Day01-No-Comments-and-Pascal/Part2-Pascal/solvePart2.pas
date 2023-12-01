program SolvePart2;
uses crt, sysutils;

function reverseString(const str: string): string;
var
  i, j: Integer;
begin
  j := length(str);
  setlength(reverseString, j);
  for i := 1 to j do
    reverseString[i] := str[j - i + 1];
end;

type
DigitString = (zero, one, two, three, four, five, six, seven, eight, nine);

var
configurationDocument: Text;
selectedConfigurationLine: string;
input: string;
reversedInput: string;
selectedPosition: Integer;
lowestPosition: Integer = 9999;
tensDigit: Integer;
onesDigit: Integer;
configurationValue: Integer;
configurationValueSum: Longint = 0;
calibrationValueString: string;

begin

  assign(configurationDocument, 'challengeInput.dat');
  reset(configurationDocument);
  while not eof(configurationDocument) do
  begin
    ReadLn(configurationDocument, selectedConfigurationLine);
    lowestPosition := 9999;

    // writeln('Please enter your input: ');
    // readln(input);

    writeln(selectedConfigurationLine);

    selectedPosition := pos('zero',selectedConfigurationLine);
    if (selectedPosition < lowestPosition) and (selectedPosition > 0) then
     begin
      lowestPosition := selectedPosition;
      tensDigit := 0;
     end;

    selectedPosition := pos('0',selectedConfigurationLine);
    if (selectedPosition < lowestPosition) and (selectedPosition > 0) then
     begin
      lowestPosition := selectedPosition;
      tensDigit := 0;
     end;

    selectedPosition := pos('one',selectedConfigurationLine);
    if (selectedPosition < lowestPosition) and (selectedPosition > 0) then
     begin
      lowestPosition := selectedPosition;
      tensDigit := 10;
     end;

    selectedPosition := pos('1',selectedConfigurationLine);
    if (selectedPosition < lowestPosition) and (selectedPosition > 0) then
     begin
      lowestPosition := selectedPosition;
      tensDigit := 10;
     end;

    selectedPosition := pos('two',selectedConfigurationLine);
    if (selectedPosition < lowestPosition) and (selectedPosition > 0) then
     begin
      lowestPosition := selectedPosition;
      tensDigit := 20;
     end;

    selectedPosition := pos('2',selectedConfigurationLine);
    if (selectedPosition < lowestPosition) and (selectedPosition > 0) then
     begin
      lowestPosition := selectedPosition;
      tensDigit := 20;
     end;

    selectedPosition := pos('three',selectedConfigurationLine);
    if (selectedPosition < lowestPosition) and (selectedPosition > 0) then
     begin
      lowestPosition := selectedPosition;
      tensDigit := 30;
     end;

    selectedPosition := pos('3',selectedConfigurationLine);
    if (selectedPosition < lowestPosition) and (selectedPosition > 0) then
     begin
      lowestPosition := selectedPosition;
      tensDigit := 30;
     end;

    selectedPosition := pos('four',selectedConfigurationLine);
    if (selectedPosition < lowestPosition) and (selectedPosition > 0) then
     begin
      lowestPosition := selectedPosition;
      tensDigit := 40;
     end;

    selectedPosition := pos('4',selectedConfigurationLine);
    if (selectedPosition < lowestPosition) and (selectedPosition > 0) then
     begin
      lowestPosition := selectedPosition;
      tensDigit := 40;
     end;

    selectedPosition := pos('five',selectedConfigurationLine);
    if (selectedPosition < lowestPosition) and (selectedPosition > 0) then
     begin
      lowestPosition := selectedPosition;
      tensDigit := 50;
     end;

    selectedPosition := pos('5',selectedConfigurationLine);
    if (selectedPosition < lowestPosition) and (selectedPosition > 0) then
     begin
      lowestPosition := selectedPosition;
      tensDigit := 50;
     end;

    selectedPosition := pos('six',selectedConfigurationLine);
    if (selectedPosition < lowestPosition) and (selectedPosition > 0) then
     begin
      lowestPosition := selectedPosition;
      tensDigit := 60;
     end;

    selectedPosition := pos('6',selectedConfigurationLine);
    if (selectedPosition < lowestPosition) and (selectedPosition > 0) then
     begin
      lowestPosition := selectedPosition;
      tensDigit := 60;
     end;

    selectedPosition := pos('seven',selectedConfigurationLine);
    if (selectedPosition < lowestPosition) and (selectedPosition > 0) then
     begin
      lowestPosition := selectedPosition;
      tensDigit := 70;
     end;

    selectedPosition := pos('7',selectedConfigurationLine);
    if (selectedPosition < lowestPosition) and (selectedPosition > 0) then
     begin
      lowestPosition := selectedPosition;
     tensDigit := 70;
     end;

    selectedPosition := pos('eight',selectedConfigurationLine);
    if (selectedPosition < lowestPosition) and (selectedPosition > 0) then
     begin
      lowestPosition := selectedPosition;
     tensDigit := 80;
     end;

    selectedPosition := pos('8',selectedConfigurationLine);
    if (selectedPosition < lowestPosition) and (selectedPosition > 0) then
     begin
      lowestPosition := selectedPosition;
     tensDigit := 80;
     end;

    selectedPosition := pos('nine',selectedConfigurationLine);
    if (selectedPosition < lowestPosition) and (selectedPosition > 0) then
     begin
      lowestPosition := selectedPosition;
     tensDigit := 90;
     end;

    selectedPosition := pos('9',selectedConfigurationLine);
    if (selectedPosition < lowestPosition) and (selectedPosition > 0) then
     begin
      lowestPosition := selectedPosition;
     tensDigit := 90;
     end;

    reversedInput := reverseString(selectedConfigurationLine);
    lowestPosition := 9999;

    selectedPosition := pos('orez',reversedInput);
    if (selectedPosition < lowestPosition) and (selectedPosition > 0) then
      begin
        lowestPosition := selectedPosition;
        onesDigit := 0;
      end;

    selectedPosition := pos('0',reversedInput);
    if (selectedPosition < lowestPosition) and (selectedPosition > 0) then
      begin
        lowestPosition := selectedPosition;
        onesDigit := 0;
      end;

    selectedPosition := pos('eno',reversedInput);
    if (selectedPosition < lowestPosition) and (selectedPosition > 0) then
      begin
        lowestPosition := selectedPosition;
        onesDigit := 1;
      end;

    selectedPosition := pos('1',reversedInput);
    if (selectedPosition < lowestPosition) and (selectedPosition > 0) then
      begin
        lowestPosition := selectedPosition;
        onesDigit := 1;
      end;

    selectedPosition := pos('owt',reversedInput);
    if (selectedPosition < lowestPosition) and (selectedPosition > 0) then
      begin
        lowestPosition := selectedPosition;
        onesDigit := 2;
      end;

    selectedPosition := pos('2',reversedInput);
    if (selectedPosition < lowestPosition) and (selectedPosition > 0) then
      begin
        lowestPosition := selectedPosition;
        onesDigit := 2;
      end;

    selectedPosition := pos('eerht',reversedInput);
    if (selectedPosition < lowestPosition) and (selectedPosition > 0) then
      begin
        lowestPosition := selectedPosition;
        onesDigit := 3;
      end;

    selectedPosition := pos('3',reversedInput);
    if (selectedPosition < lowestPosition) and (selectedPosition > 0) then
      begin
        lowestPosition := selectedPosition;
        onesDigit := 3;
      end;

    selectedPosition := pos('ruof',reversedInput);
    if (selectedPosition < lowestPosition) and (selectedPosition > 0) then
      begin
        lowestPosition := selectedPosition;
        onesDigit := 4;
      end;

    selectedPosition := pos('4',reversedInput);
    if (selectedPosition < lowestPosition) and (selectedPosition > 0) then
      begin
        lowestPosition := selectedPosition;
        onesDigit := 4;
      end;

    selectedPosition := pos('evif',reversedInput);
    if (selectedPosition < lowestPosition) and (selectedPosition > 0) then
      begin
        lowestPosition := selectedPosition;
        onesDigit := 5;
      end;

    selectedPosition := pos('5',reversedInput);
    if (selectedPosition < lowestPosition) and (selectedPosition > 0) then
      begin
        lowestPosition := selectedPosition;
        onesDigit := 5;
      end;

    selectedPosition := pos('xis',reversedInput);
    if (selectedPosition < lowestPosition) and (selectedPosition > 0) then
      begin
        lowestPosition := selectedPosition;
      onesDigit := 6;
      end;

    selectedPosition := pos('6',reversedInput);
    if (selectedPosition < lowestPosition) and (selectedPosition > 0) then
      begin
        lowestPosition := selectedPosition;
      onesDigit := 6;
      end;

    selectedPosition := pos('neves',reversedInput);
    if (selectedPosition < lowestPosition) and (selectedPosition > 0) then
      begin
        lowestPosition := selectedPosition;
      onesDigit := 7;
      end;

    selectedPosition := pos('7',reversedInput);
    if (selectedPosition < lowestPosition) and (selectedPosition > 0) then
      begin
        lowestPosition := selectedPosition;
      onesDigit := 7;
      end;

    selectedPosition := pos('thgie',reversedInput);
    if (selectedPosition < lowestPosition) and (selectedPosition > 0) then
      begin
        lowestPosition := selectedPosition;
      onesDigit := 8;
      end;

    selectedPosition := pos('8',reversedInput);
    if (selectedPosition < lowestPosition) and (selectedPosition > 0) then
      begin
        lowestPosition := selectedPosition;
      onesDigit := 8;
      end;

    selectedPosition := pos('enin',reversedInput);
    if (selectedPosition < lowestPosition) and (selectedPosition > 0) then
      begin
        lowestPosition := selectedPosition;
      onesDigit := 9;
      end;

    selectedPosition := pos('9',reversedInput);
    if (selectedPosition < lowestPosition) and (selectedPosition > 0) then
      begin
        lowestPosition := selectedPosition;
      onesDigit := 9;
      end;

    configurationValue := tensDigit + onesDigit;
    configurationValueSum := configurationValueSum + configurationValue;
    writeln(configurationValueSum);
  end;
   writeln(configurationValueSum);
   readkey;
end. 