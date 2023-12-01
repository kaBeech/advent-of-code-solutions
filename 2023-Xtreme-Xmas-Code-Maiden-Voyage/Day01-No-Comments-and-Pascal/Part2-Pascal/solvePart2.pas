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
digitString = (zero, one, two, three, four, five, six, seven, eight, nine);

const
  str = '2';
  str2 = '1';

var
input: string;
reversedInput: string;
selectedPosition: Integer;
lowestPosition: Integer = 9999;
tensDigit: Integer;
onesDigit: Integer;
configurationValue: Integer;
calibrationValueString: string;

begin
  calibrationValueString:= str + str2;
  writeln(calibrationValueString);
  writeln('Please enter your input: ');
  readln(input);

    selectedPosition := pos('zero',input);
    if (selectedPosition < lowestPosition) and (selectedPosition > 0) then
     begin
      lowestPosition := selectedPosition;
      tensDigit := 0;
     end;

    selectedPosition := pos('one',input);
    if (selectedPosition < lowestPosition) and (selectedPosition > 0) then
     begin
      lowestPosition := selectedPosition;
      tensDigit := 10;
     end;

    selectedPosition := pos('two',input);
    if (selectedPosition < lowestPosition) and (selectedPosition > 0) then
     begin
      lowestPosition := selectedPosition;
      tensDigit := 20;
     end;

    selectedPosition := pos('three',input);
    if (selectedPosition < lowestPosition) and (selectedPosition > 0) then
     begin
      lowestPosition := selectedPosition;
      tensDigit := 30;
     end;

    selectedPosition := pos('four',input);
    if (selectedPosition < lowestPosition) and (selectedPosition > 0) then
     begin
      lowestPosition := selectedPosition;
      tensDigit := 40;
     end;

    selectedPosition := pos('five',input);
    if (selectedPosition < lowestPosition) and (selectedPosition > 0) then
     begin
      lowestPosition := selectedPosition;
      tensDigit := 50;
     end;

    selectedPosition := pos('six',input);
    if (selectedPosition < lowestPosition) and (selectedPosition > 0) then
     begin
      lowestPosition := selectedPosition;
      tensDigit := 60;
     end;

    selectedPosition := pos('seven',input);
    if (selectedPosition < lowestPosition) and (selectedPosition > 0) then
     begin
      lowestPosition := selectedPosition;
      tensDigit := 70;
     end;

    selectedPosition := pos('eight',input);
    if (selectedPosition < lowestPosition) and (selectedPosition > 0) then
     begin
      lowestPosition := selectedPosition;
      tensDigit := 80;
     end;

    selectedPosition := pos('nine',input);
    if (selectedPosition < lowestPosition) and (selectedPosition > 0) then
     begin
      lowestPosition := selectedPosition;
      tensDigit := 90;
     end;

  reversedInput := reverseString(input);
  lowestPosition := 9999;

  selectedPosition := pos('orez',reversedInput);
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

  selectedPosition := pos('owt',reversedInput);
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

  selectedPosition := pos('ruof',reversedInput);
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

  selectedPosition := pos('xis',reversedInput);
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

  selectedPosition := pos('thgie',reversedInput);
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

configurationValue := tensDigit + onesDigit;

   writeln(configurationValue);
   readkey;
end. 